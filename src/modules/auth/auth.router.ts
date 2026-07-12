import { Router } from "express";
import { authController } from "./auth.controller";



const router=Router()
// register user route
router.post("/register",authController.postUserIntoDb)
router.post("/login",authController.loginUser)


export const authRouter=router;