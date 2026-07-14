import { Router } from "express";
import { customerController } from "./customer.controller";

const router=Router()

router.get("/",customerController.getAllServices)
router.get("/technician",customerController.getAllTechnician)
router.get("/technicians/:id",customerController.getSingleTechnician)
router.get("/categories",customerController.getAllCategories)


export const customerRouter=router