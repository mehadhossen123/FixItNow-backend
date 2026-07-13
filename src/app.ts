import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { authRouter} from "./modules/auth/auth.router";
import { adminRouter } from "./modules/admin/admin.router";
import { technicianRouter } from "./modules/technician/technician.router";


const app:Application=express()

// SETUP CORS ERROR
app.use(cors({
    origin:config.app_url,
  credentials:true

}))

// SOME MIDDLE WARE 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//  here my all route 
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/technician",technicianRouter)


app.get("/",(req:Request,res:Response)=>{
    res.send("the is the Fixitnow server ")
})














export default app;