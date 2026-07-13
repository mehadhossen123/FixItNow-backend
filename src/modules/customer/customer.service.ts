import { title } from "node:process";
import { prisma } from "../../lib/prisma"
import { filterPayload } from "../technician/technician.interface";


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



export const customerService = {
  getAllServices,
  getAllTechnician,
  getSingleTechnician,
};