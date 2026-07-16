import { get } from "node:http";
import { prisma } from "../../lib/prisma";
import { CategoryPayload, updateStatusPayload } from "./admin.interface"
import { UserStatus } from "../../../generated/prisma/enums";

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

// get all users by admin 
const getAllUsers=async()=>{
    const result=await prisma.user.findMany({
        orderBy:{
            createdAt:"desc"
        },
        omit:{
            password:true
        }
    })

    return result
}
// update user status 
const updateUserStatus=async(payload:updateStatusPayload,id:string)=>{
    const {status}=payload;
    // this si my mind maping part 
    if (status !== UserStatus.ACTIVE && status !==UserStatus.BLOCKED) {
      throw new Error("You can only blocked or active the user");
    }
    const updateStatus=await prisma.user.update({
        where:{
            id:id
        },
        data:{
            status:status

        },
        omit:{
            password:true
        }

    })

    return updateStatus;
}


// get all bookings 
const getAllBookings=async()=>{
    const result=await prisma.booking.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })

    return result

    
}


export const adminService={
    postCategories,
    getAllCategories,
    getAllUsers,
    updateUserStatus,
    getAllBookings
}