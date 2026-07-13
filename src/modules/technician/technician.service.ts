// post service by technician 


import { prisma } from "../../lib/prisma";
import { technicianProfilePayload, technicianServicePayload } from "./technician.interface";

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


// update technician profile
const updateProfile = async (
  payload: technicianProfilePayload,
  id: string,
) => {
    const {bio,location,experience,slots}=payload;

    
    const isExist=await prisma.technician.findUnique({
        where:{
            userId:id

        }
    })
    if(!isExist){
        throw new Error("you don't have any profile")
    }

    const updateResult=await prisma.technician.update({
        where:{
            userId:id
        },
        data:{
            bio,
            slots,
            location,
            experience:Number(experience)

        }
    })

    return updateResult
};


export const technicianService={
    postService,
    updateProfile
}