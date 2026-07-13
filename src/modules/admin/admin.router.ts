import { Router } from "express";
import { adminController } from "./admin.controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Role } from "../../../generated/prisma/enums";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();
router.post("/categories",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isAdmin,adminController.postCategories)

export const adminRouter = router;
