import { Router } from "express";
import { customerController } from "./customer.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Role } from "../../../generated/prisma/enums";
import { isCustomer } from "../../middleware/isCustomer";

const router=Router()

router.get("/",customerController.getAllServices)
router.get("/technician",customerController.getAllTechnician)
router.get("/technicians/:id",customerController.getSingleTechnician)
router.get("/categories",customerController.getAllCategories)
router.post("/bookings",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isCustomer
,customerController.postBookings)
router.get("/bookings",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isCustomer
,customerController.getBookings)
router.get(
  "/bookings/:id",
  isAuthenticated(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  isCustomer,
  customerController.getSingleBooking,
);


export const customerRouter=router