// post service by technician 
import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { Status, technicianProfilePayload, technicianServicePayload } from "./technician.interface";

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



// update updateAvailability by technician
const updateAvailability = async (
  payload:{slots: string},
  id: string,
) => {
  
  const{slots}=payload

  const isExist = await prisma.technician.findUnique({
    where: {
      userId: id,
    },
  });

  
  if (!isExist) {
    throw new Error("you don't have any profile to update");
  }
 const updatedSlots: string[] = [ slots];

  const updateResult = await prisma.technician.update({
    where: {
      userId: id,
    },
    data: {
   
     slots:updatedSlots
      
    
    },
  });

  return updateResult;
};


// getAllBookings 
const getAllBookings = async (technicianId:string) => {
  // check is technician is exist 
  const findTechnician=await prisma.technician.findUnique({
    where:{
      userId:technicianId
    }
  })
  if(!findTechnician){
    throw new Error("There is no technician profile")
  }
  
   const result=await prisma.booking.findMany({
    where:{
      technicianId:findTechnician.id
    },
   include: {
    customer:{
      select:{
        name:true,
        email:true
      }
    }
    
   }
   })


   return result;
};  


// update bookings status 
const updateBookingStatus = async (
  payload: Status,
  technicianId: string,
  bookingId:string,
) => {
  const {status}=payload
  const booking=await prisma.booking.findUnique({
    where:{id:bookingId}
  })

  const technician=await prisma.technician.findUnique({
    where:{userId:technicianId}
  })

 if (!technician){
    throw new Error("Didn't found any technician profile");
    
  }

  if(booking?.technicianId!==technician?.id){
    throw new Error("This is not your booking")

  }
  if(booking?.status=="DECLINE" && status==BookingStatus.DECLINE){
    throw new Error("You have already decline the booking")
  }
  if(booking?.status=="ACCEPT" && status==BookingStatus.ACCEPT){
    throw new Error("You have already accept the booking")
  }
  if (booking?.status == "IN_PROGRESS" && status == BookingStatus.IN_PROGRESS) {
    throw new Error("The booking is already in_progress mode");
  }
  if (booking?.status == "COMPLETE" && status == BookingStatus.COMPLETE) {
    throw new Error("The booking is already completed");
  }

  if(booking?.status=="PENDING" && (status==BookingStatus.ACCEPT || 
    status==BookingStatus.DECLINE)){
   const updated= await prisma.booking.update({
      where:{id:bookingId},
      data:{
        status:status
      }
    })
    return updated
  
  }


  if(booking?.status=="PAID" && (status==BookingStatus.IN_PROGRESS|| 
    status==BookingStatus.DECLINE)){
   const updated= await prisma.booking.update({
      where:{id:bookingId},
      data:{
        status:status
      }
    })

    return updated;

  }
  if(booking?.status=="IN_PROGRESS" && (status==BookingStatus.COMPLETE|| 
    status==BookingStatus.DECLINE)){
   const updated= await prisma.booking.update({
      where:{id:bookingId},
      data:{
        status:status
      }
    })

    return updated;

  }

  throw new Error("Invalid status for this booking")
  
  

};




export const technicianService = {
  postService,
  updateProfile,
  updateAvailability,
  getAllBookings,
  updateBookingStatus,
};