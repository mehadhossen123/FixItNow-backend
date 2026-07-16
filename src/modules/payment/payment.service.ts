import { BookingStatus } from "../../../generated/prisma/enums";

import config from "../../config";
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe";

// create stripe checkout
const createCheckOut = async (id: string, bookingId:string) => {
 
  const transactionalResult = await prisma.$transaction(
    async (tx) => {
        const booking=await tx.booking.findUniqueOrThrow({
            where:{id:bookingId},
            include:{
                service:true,
                customer:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                        stripeCustomerId:true
                    }
                }
               
            }
        })

      
        

        if (booking?.customer?.id !== id) {
          throw new Error(
            "Unauthorized !This booking does not belong to your account!",
          );
        }
        if(booking.status!==BookingStatus.ACCEPT){
            throw new Error("You can only pay for accepted booking")
        }

        let stripeCustomerId=booking.customer.stripeCustomerId;

        if(!stripeCustomerId){
            const makeStripeCustomerId=await stripe.customers.create({
                name:booking.customer.name,
                email:booking.customer.email,
                metadata:{userId:id}

            })
            stripeCustomerId=makeStripeCustomerId.id;

        }
    // update stripe customer id into user 
        await tx.user.update({
            where:{
                id:id

            },
            data:{
                stripeCustomerId:stripeCustomerId
            }
        })

        const totalAmount:number = Math.round(Number(booking?.totalCost)*100) 

        // now create a stripe session 
        const session =await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          customer: stripeCustomerId,
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: booking.service.title,
                  description: `payment for booking${booking.id}`,
                },
                unit_amount: totalAmount,
              },
              quantity: 1,
            },
          ],
          success_url: `${config.app_url}/customer/bookings?success=true&bookingId=${booking.id}`,
          cancel_url: `${config.app_url}/customer/bookings?success=false`,
          metadata: {
            bookingId: booking.id,
            userId: id,
          },


         
        });

        return  session.url;

       



      
       

    });

    

    return transactionalResult;
};



export const paymentService={
    createCheckOut
}