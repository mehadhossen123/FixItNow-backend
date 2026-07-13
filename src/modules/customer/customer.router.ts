import { Router } from "express";
import { customerController } from "./customer.controller";

const router=Router()

router.get("/",customerController.getAllServices)



export const customerRouter=router