
import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { technicianService } from "./technician.service";

// post service by technician

const postService = async (req: Request, res: Response) => {
  try {
    const payload = req?.body;
    const technicianId=req?.user?.id;
    const result = await technicianService.postService(payload,technicianId as string)

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Get user profile successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};


const updateProfile = async (req: Request, res: Response) => {
  try {
    const payload = req?.body;
    const technicianId=req?.user?.id;
    const result = await technicianService.updateProfile(payload,technicianId as string)

    res.status(httpStatus.OK).json({
      success: true,
      message: "Get user profile successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};



export const technicianController={
    postService,
    updateProfile,
}