import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import httpStatus from 'http-status-codes'
import { DecodeOptions, JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import config from "../config";

// global type 
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}


export const isAuthenticated = (...requiredRole: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.cookies?.accessToken;
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Token required. Please login first",
      });
    }

    const verifiedToken = jwt.decode(
      token,
      config.jWt_access_secret as DecodeOptions,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    const { id, name, email, role } = verifiedToken as JwtPayload;

    // const requiredRole = [Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN];
    if (!requiredRole.includes(role)) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "You don't have any permission to access",
      });
    }

    req.user = {
      id,
      name,
      email,
      role,
    };

    next();
  };
};
