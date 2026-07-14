import { Request, Response } from "express";
import httpsStatus from "http-status-codes"
import { customerService } from "./customer.service";

// customer get all services
const getAllServices = async (req: Request, res: Response) => {
  try {
    
    const result = await customerService.getAllServices()
     

    res.status(httpsStatus.OK).json({
      success: true,
      message: "Get all service",
      data: result,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};

// customer get all technicians
const getAllTechnician = async (req: Request, res: Response) => {
  try {
    const result = await customerService.getAllTechnician(req.query )
    if(result.length==0){
        res.json({
            message:"Didn't found any data four your search"
        })
    }
    res.status(httpsStatus.OK).json({
      success: true,
      message: "Get all technicians",
      data: result,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};

// get single technician

const getSingleTechnician = async (req: Request, res: Response) => {
  try {
    const result = await customerService.getSingleTechnician(req.params.id as string);
    
    res.status(httpsStatus.OK).json({
      success: true,
      message: "Get particular technicians",
      data: result,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};


const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await customerService.getAllCategories()
    
    res.status(httpsStatus.OK).json({
      success: true,
      message: "Get all categories",
      data: result,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};

const postBookings = async (req: Request, res: Response) => {
  try {
    const customerId=req?.user?.id;
    const payload=req.body;
    const result = await customerService.postBookings(payload,customerId as string)
    
    res.status(httpsStatus.CREATED).json({
      success: true,
      message: "Post booking successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};




export const customerController = {
  getAllServices,
  getAllTechnician,
  getSingleTechnician,
  getAllCategories,
  postBookings
};
