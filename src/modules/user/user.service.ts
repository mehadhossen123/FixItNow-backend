import { prisma } from "../../lib/prisma"
import { PayloadUser } from "./user.interface"
import bcrypt from "bcrypt"

const postUserIntoDb=async(payload:PayloadUser)=>{
    console.log(payload)
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


export const userService={
    postUserIntoDb,
}