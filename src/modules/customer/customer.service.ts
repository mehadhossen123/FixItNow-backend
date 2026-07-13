import { prisma } from "../../lib/prisma"


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



export const customerService={
    getAllServices
}