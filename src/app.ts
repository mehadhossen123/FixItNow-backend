import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";

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


app.get("/",(req:Request,res:Response)=>{
    res.send("the is the Fixitnow server ")
})














export default app;