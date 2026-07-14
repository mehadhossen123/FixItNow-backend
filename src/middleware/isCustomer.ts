import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req?.user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized!.Please login first",
      });
    }

    if (req?.user?.role !== "CUSTOMER") {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "You are not customer",
      });
    }

    next();
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};
