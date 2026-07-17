import httpStatus from "http-status-codes"
import { paymentService } from "./payment.service";
import { Request, Response } from "express";

   
   // create a checkout session


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


const handleWebhook = async (req: Request, res: Response) => {
  try {
   
   const payload = req.body as Buffer;
   const signature = req.headers["stripe-signature"] as string;

   if (!signature) {
     return res.status(httpStatus.BAD_REQUEST).json({
       success: false,
       message: "Stripe signature missing in headers",
     });
   }

    await paymentService.handleWebhook(payload,signature as string)

    res.status(httpStatus.OK).json({
      success: true,
      message: "Webhook triggered successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  }
};



// get all payment history 

const getAllPaymentHistory = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
   

    const result = await paymentService.getAllPaymentHistory(
      customerId as string,
     
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Get all payment history successfully",
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


// get single payment history 
const getSinglePaymentHistory = async (req: Request, res: Response) => {
  try {
 
    const id=req.params.id;

    const result = await paymentService.getSinglePaymentHistory(
 
      id as string
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Get  payment history successfully",
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






export const paymentController={
    createCheckoutSession,
    handleWebhook,
    getAllPaymentHistory,
    getSinglePaymentHistory
}
