import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import jwt, { DecodeOptions, JwtPayload } from "jsonwebtoken";
import config from "../../config";
import httpStatus from "http-status-codes";
import { Role } from "../../../generated/prisma/enums";
import { isAuthenticated } from "../../middleware/isAuthenticated";






const router = Router();
// register user route
router.post("/register", authController.postUserIntoDb);
router.post("/login", authController.loginUser);
router.post("/access-token", authController.makeAccessToken);
router.get("/me", isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN), authController.getMyProfile);

export const authRouter = router;
