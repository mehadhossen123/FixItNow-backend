import { Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status-codes"

const postUserIntoDb=async(req:Request,res:Response)=>{
    try {
        const payload=req.body;
  
        
        const result=await userService.postUserIntoDb(payload)
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

export const userController={
    postUserIntoDb,
}