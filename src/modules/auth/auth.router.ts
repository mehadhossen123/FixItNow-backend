import { Router } from "express";
import { authController } from "./auth.controller";



const router=Router()
// register user route
router.post("/register",authController.postUserIntoDb)
router.post("/login",authController.loginUser)
router.post("/access-token",authController.makeAccessToken)


export const authRouter=router;