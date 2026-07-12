import { Request, Response } from "express";

import httpStatus from "http-status-codes"
import { authService } from "./auth.service";



// user register 
const postUserIntoDb=async(req:Request,res:Response)=>{
    try {
        const payload=req.body;
  
        
        const result=await authService.postUserIntoDb(payload)
        res.status(httpStatus.CREATED).json({
            success:true,
            message:"User register successfully",
            data:result
        })
        
    } catch (error:any) {
        res.status(httpStatus.CONFLICT).json({
            success:false,
            message:`${error.message}`,
            data:null
        
        })
        
    }
}


// user login 
const loginUser=async(req:Request,res:Response)=>{
    try {
      const payload = req.body;

      const { refreshToken , accessToken}= await authService.loginUser(payload)

      res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // mili second in one day
      });

      res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24*7, // mili second in one day
      });


      res.status(httpStatus.OK).json({
        success: true,
        message: "User login successfully",
        data: {
            refreshToken,
            accessToken
        },
      });
    } catch (error: any) {
      res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: `${error.message}`,
        data: null,
      });
    }
}


// make access token using refresh token 
const makeAccessToken=async(req:Request,res:Response)=>{

     try {
       const token = req?.cookies?.refreshToken;
    

       const accessToken =
         await authService.makeAccessToken(token );

       res.cookie("accessToken", accessToken, {
         secure: true,
         httpOnly: true,
         sameSite: "none",
         maxAge: 1000 * 60 * 60 * 24, // mili second in one day
       });

      
       res.status(httpStatus.OK).json({
         success: true,
         message: "Get refresh token",
         data: { accessToken}
         
       });
     } catch (error: any) {
       res.status(httpStatus.FORBIDDEN).json({
         success: false,
         message: `${error.message}`,
         data: null,
       });
     }

}


// get my profile api 
const getMyProfile=async(req:Request,res:Response)=>{
     try {
      

       

      

       res.status(httpStatus.OK).json({
         success: true,
         message: "Get refresh token",
         data: { accessToken },
       });
     } catch (error: any) {
       res.status(httpStatus.FORBIDDEN).json({
         success: false,
         message: `${error.message}`,
         data: null,
       });
     }


}

export const authController = {
  postUserIntoDb,
  loginUser,
  makeAccessToken,
  getMyProfile,
};