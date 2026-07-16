
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

// update technician profile
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

// update updateAvailability by technician

const updateAvailability = async (req: Request, res: Response) => {
  try {
    const payload = req?.body;
    const technicianId = req?.user?.id;
    const result = await technicianService.updateAvailability(
      payload,
      technicianId as string,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Updated availability slots",
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

// get all bookings 
const getAllBookings = async (req: Request, res: Response) => {
  try {
   
    const technicianId = req?.user?.id;
    
    const result = await technicianService.getAllBookings(
      
      technicianId as string,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Get all bookings",
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



// update booking status by technician
const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const payload = req?.body;
    const technicianId=req?.user?.id;
    const bookingId=req.params.id;
    const result = await technicianService.updateBookingStatus(payload,technicianId as string,bookingId as string)

    res.status(httpStatus.OK).json({
      success: true,
      message: "Update booking status successfully",
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










export const technicianController = {
  postService,
  updateProfile,
  updateAvailability,
  getAllBookings,
  updateBookingStatus,
};