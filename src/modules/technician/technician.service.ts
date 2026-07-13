// post service by technician 

import { prisma } from "../../lib/prisma";
import { technicianServicePayload } from "./technician.interface";

const postService = async (payload: technicianServicePayload,technicianId:string) => {
    console.log(technicianId,"techid")
   
   if(!technicianId){
    throw new Error("Unauthorized! required technician id")
   }

   const technicianProfile=await prisma.technician.findUnique({
    where:{userId:technicianId}
   })

   

   if(!technicianProfile){
    throw new Error("Didn't found any technician profile")
   }

   const { title, description, price, categoryId } = payload;
   const result = await prisma.services.create({
     data: {
       title,
       description,
       price,
       categoryId,
       technicianId: technicianProfile.id,
     },
     include: {
       category: true,
       technician: true,
     },
   });

   return result

};


export const technicianService={
    postService,
}