import { get } from "node:http";
import { prisma } from "../../lib/prisma";
import { CategoryPayload } from "./admin.interface"

// post categories by admin 
const postCategories=async(payload:CategoryPayload,role:string)=>{
    const {name,description}=payload;
   if(!role){
    throw new Error("Your are not admin")
   }
   const result=await prisma.categories.create({
    data:{
        name,
        description
    }
   })

   return result

    

}
// get categories by admin 
const getAllCategories=async(role:string)=>{
   
   if(!role){
    throw new Error("Your are not admin")
   }
   const result=await prisma.categories.findMany({
    orderBy:{
        createdAt:"desc"
    }
    // after will implement total service count
   })

   return result

    

}


export const adminService={
    postCategories,
    getAllCategories
}