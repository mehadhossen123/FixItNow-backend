import { JwtPayload, SignOptions } from "jsonwebtoken"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { makeToken } from "../../utilities/tokenUtilities"
import { LoginPayload, PayloadUser } from "./auth.interface"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



// register user into db 
const postUserIntoDb=async(payload:PayloadUser)=>{
  
    const { name, email, role, password,location } = payload;

//  check user is exist?
    const existUser=await prisma.user.findUnique({
        where:{email}

        
    })
    // if user exist then through an error

    if(existUser){
        throw new Error("User already exist with this email")
    }

    // password hashed
    const hashPassword=await bcrypt.hash(password,10)
// now register the user into db
const transactionResult=await prisma.$transaction(
    async(tx)=>{
    const newUser=    await tx.user.create({
        data:{
            name,
            email,
            password:hashPassword,
            role
        },
        omit:{
            password:true
        }

        })


        // if payload.role=="technician"
        if(payload.role=="TECHNICIAN"){
            const technicianProfile=await tx.technician.create({
                data:{
                    userId:newUser.id,
                    location
                }
            })
        }


        return newUser;



})

return transactionResult;
  

   



}


// login user form database 
const loginUser = async (payload: LoginPayload) => {

    // check user is exist?
   const user=await prisma.user.findUnique({
    where:{email:payload.email}
   })
//  if user doesn't exist ?
if(!user){
    throw new Error("Invalids credentials")
}
// user is inactive ?
if(user.isActive==false){
    throw new Error("Your account is closed now. please contact fixitnow author")
}


// check password is matched?

const isMatchedPassword=await bcrypt.compare(payload.password,user?.password)

  if(!isMatchedPassword){
    throw new Error("Invalid password")

}

//make jwt payload
const jwtPayload:JwtPayload={
    id:user?.id,
    name:user?.name,
    email:user?.email,
    role:user?.role,

}

// make access token 
const accessToken = makeToken(jwtPayload, config.jWt_access_secret, {
  expiresIn: config.jWt_access_expires_in as SignOptions["expiresIn"],
}); 
// make refresh token 

const refreshToken = makeToken(jwtPayload, config.jwt_refresh_secret, {
  expiresIn: config.jwt_refresh_expires_in as SignOptions["expiresIn"],
}); 


return{

    accessToken,
    refreshToken
}





};


// make access token using refresh token
const makeAccessToken = async (token: string) => {
  const verifyToken = jwt.verify(token, config.jwt_refresh_secret);
  if (!verifyToken) {
    throw new Error("Refresh token required!");
  }

  const { id } = verifyToken as JwtPayload;
  //    find user
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User doesn't found");
  }
  if (user.isActive == false) {
    throw new Error("Your account is not active");
  }

  //make jwt payload
  const jwtPayload: JwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  // make access token
  const accessToken = makeToken(jwtPayload, config.jWt_access_secret, {
    expiresIn: config.jWt_access_expires_in as SignOptions["expiresIn"],
  });

  return accessToken;
};

// get my profile form db 
const getMyProfile=async(id:string)=>{
    if(!id){
        throw new Error ("Didn't find any id")
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        technicianProfile :true
      },
      omit:{
        password:true
      }
    });

    return user;
  

}


export const authService = {
  postUserIntoDb,
  loginUser,
  makeAccessToken,
  getMyProfile,
};