import { Request, Response } from "express";
import { adminService } from "./admin.service";
import httpStatus from "http-status-codes"

// post categories by admin
const postCategories=async(req:Request,res:Response)=>{
    try {
       const role = req?.user?.role;
    const payload = req?.body;
    const result = await adminService.postCategories(payload,role as string);
      res.status(httpStatus.CREATED).json({
        success: true,
        message: "Category post successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        message: `${error.message}`,
        data: null,
      });
    }
}
// get all  categories by admin
const getAllCategories=async(req:Request,res:Response)=>{
    try {
       const role = req?.user?.role;
  
    const result = await adminService.getAllCategories(role as string);
      res.status(httpStatus.OK).json({
        success: true,
        message: "All Category retrieve successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        message: `${error.message}`,
        data: null,
      });
    }
}
// get all  users by admin
const getAllUsers=async(req:Request,res:Response)=>{
    try {
       
  
    const result = await adminService.getAllUsers();
      res.status(httpStatus.OK).json({
        success: true,
        message: "All users retrieve successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(httpStatus.NOT_IMPLEMENTED).json({
        success: false,
        message: `${error.message}`,
        data: null,
      });
    }
}


export  const adminController={
    postCategories,
    getAllCategories,
    getAllUsers
}