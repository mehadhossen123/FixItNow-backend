import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Role } from "../../../generated/prisma/enums";
import { isCustomer } from "../../middleware/isCustomer";
import { paymentController } from "./payment.controller";

const router=Router();

router.post("/create",isAuthenticated(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),isCustomer,paymentController.createCheckoutSession)
router.post("/webhook",paymentController.handleWebhook)



export const paymentRoute=router;