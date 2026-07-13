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



export const customerController={
    getAllServices
}
