import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { reviewService } from "./review.service";

//  get single bookings
const giveReviewForTechnician = async (req: Request, res: Response) => {
  try {
    const payload=req.body;
    const customerId = req?.user?.id;

    const result = await reviewService.giveReviewForTechnician(payload ,customerId as string)
    res.status(httpStatus.OK).json({
      success: true,
      message: "Get single booking successfully",
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

export const reviewController={
    giveReviewForTechnician
}