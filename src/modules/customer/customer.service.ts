import { title } from "node:process";
import { prisma } from "../../lib/prisma"
import { filterPayload } from "../technician/technician.interface";
import { BookingPostPayload } from "./customer.interface";
import { get } from "node:http";


// get all service for customer 
const getAllServices=async()=>{

    const services=await prisma.services.findMany({
        where:{
            
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            technician:{
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }

                }
            }
        }
    })
    return services;

}

// get all technician 
const getAllTechnician=async(payload:filterPayload)=>{
        const { location, experience } = payload
        const filter:any={};
        if(location){
            filter.location={
              
                contains: location,
                mode: "insensitive",
              
            };

        }

        if(experience){
            filter.experience={
                gte:Number(experience)
            }
        }
    const technicians = await prisma.technician.findMany({
      where:filter,
      include:{
        user:{
            select:{
                name:true,
                email:true
            }
        }
      }
    });

    return technicians;

}

// get single technician 
const getSingleTechnician=async(id:string)=>{
    const technicians=await prisma.technician.findUnique({
        where:{id},
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    

                }
            }
        }
    })

    return technicians;

}

// get all categories by customer 
const getAllCategories=async()=>{
    const result=await prisma.categories.findMany({
        orderBy:{
            createdAt:"desc"
        }
       
    })

    return result;
}
// post booking 
const postBookings=async(payload:BookingPostPayload, customerId:string)=>{
    const { serviceId, technicianId, totalCost, bookingDate }=payload;
    // check technician is available or not available 
    const isTechnicianFree=await prisma.booking.findFirst({
        where:{
           technicianId,
           bookingDate:new Date(bookingDate),
           status:"ACCEPT"
           
            
        }
    
    })
    if(isTechnicianFree){
        throw new Error("The technician are not available at this moment. please try later")

    }

    const postBooking=await prisma.booking.create({
        data:{
            technicianId,
            customerId,
            bookingDate:new Date(bookingDate),
            serviceId,
            totalCost:Number(totalCost)
        }
    })

    return postBooking

}

// get all bookings 

const getBookings=async(id:string)=>{

    const result=await prisma.booking.findMany({
        where:{
            customerId:id
        }
    })

    if(!result){
        throw new Error("You have no booking now")
    }

    return result;

}
// get single bookings 
const getSingleBooking=async(id:string)=>{

    const result=await prisma.booking.findUnique({
        where:{
            id
        }
    })

    

    return result;

}



export const customerService = {
  getAllServices,
  getAllTechnician,
  getSingleTechnician,
  getAllCategories,
  postBookings,
  getBookings,
  getSingleBooking,
};