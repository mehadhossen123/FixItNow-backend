import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { authRouter} from "./modules/auth/auth.router";
import { adminRouter } from "./modules/admin/admin.router";
import { technicianRouter } from "./modules/technician/technician.router";
import { customerRouter } from "./modules/customer/customer.router";
import { paymentRoute } from "./modules/payment/payment.route";
import httpStatus from 'http-status-codes'



const app:Application=express()

// SETUP CORS ERROR
app.use(cors({
    origin:config.app_url,
  credentials:true

}))

// webhook api is here 

app.use("/api/payment/webhook", express.raw({ type: "application/json" }));


app.get("/", (req: Request, res: Response) => {
  res.send("the is the Fixitnow server ");
});



// SOME MIDDLE WARE 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//  here my all route 
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/technician",technicianRouter)
app.use("/api/customer",customerRouter)
app.use("/api/payment",paymentRoute)

// route not found path 
app.use((req:Request,res:Response)=>{
  res.status(httpStatus.NOT_FOUND).json({
    message:"Route not found",
    path:req.originalUrl
  })
})















export default app;