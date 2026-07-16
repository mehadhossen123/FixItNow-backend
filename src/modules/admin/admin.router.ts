import { Router } from "express";
import { adminController } from "./admin.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Role } from "../../../generated/prisma/enums";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();
router.post("/categories",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isAdmin,adminController.postCategories)
router.get("/categories",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isAdmin,adminController.getAllCategories)
router.get("/users",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isAdmin,adminController.getAllUsers)
router.patch("/user/:id",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isAdmin,adminController.updateUserStatus)
router.get("/bookings",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isAdmin,adminController.getAllBookings)

export const adminRouter = router;
