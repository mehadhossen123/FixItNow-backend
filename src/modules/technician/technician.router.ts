import { Router } from "express";
import { technicianController } from "./technician.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Role } from "../../../generated/prisma/enums";
import { isTechnician } from "../../middleware/isTechnician";

const router=Router()

router.post("/service",
    isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isTechnician,technicianController.postService)
router.patch("/profile",
    isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isTechnician,technicianController.updateProfile)
router.patch(
  "/availability",
  isAuthenticated(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  isTechnician,
  technicianController.updateAvailability,
);







export const technicianRouter=router