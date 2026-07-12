import { Router } from "express";

import { userController } from "./user.controller";

const router=Router()
// register user route
router.post("/register",userController.postUserIntoDb)


export const userRouter=router;