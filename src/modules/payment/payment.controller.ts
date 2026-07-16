import httpStatus from "http-status-codes"
import { paymentService } from "./payment.service";
import { Request, Response } from "express";

   
   // update booking status by technician


const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    
    const customerId=req.user?.id;
    const {bookingId}=req.body;
   
    const result=await paymentService.createCheckOut(customerId as string,bookingId as string)
   

    res.status(httpStatus.OK).json({
      success: true,
      message: "Checkout created",
      data: result
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};

export const paymentController={
    createCheckoutSession
}
