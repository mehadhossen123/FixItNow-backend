import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Role } from "../../../generated/prisma/enums";
import { isCustomer } from "../../middleware/isCustomer";
import { reviewController } from "./review.controller";

const router = Router();
router.post("/",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isCustomer,reviewController.giveReviewForTechnician)

export const reviewRouter = router;
