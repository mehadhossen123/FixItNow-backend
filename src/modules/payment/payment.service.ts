import Stripe from "stripe";
import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";

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

      
        // check have any customer id is exist in the user attribute ?

        if (booking?.customer?.id !== id) {
          throw new Error(
            "Unauthorized !This booking does not belong to your account!",
          );
        }
        if(booking.status!==BookingStatus.ACCEPT){
            throw new Error("You can only pay for accepted booking")
        }

        let stripeCustomerId=booking.customer.stripeCustomerId;
        // if not then  make a customer profile 
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


// handle webhook 
const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret!,
  );

//   event er type onujaye alada alada function call kora 
  switch (event.type) {
    case "checkout.session.completed":
      // if payment successfully done 
      await handleBookingPaymentComplete(
        event.data.object as Stripe.Checkout.Session,
      );
      break;

    case "checkout.session.expired":
      // if payment failed
      await handleBookingPaymentFailed(
        event.data.object as Stripe.Checkout.Session,
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}.`);
      break;
  }
};




//if payment successfully done (checkout.session.completed)
const handleBookingPaymentComplete = async (session: Stripe.Checkout.Session) => {
  // meta deta theke booking id and userid ana
  const bookingId = session.metadata?.bookingId;
  const userId = session.metadata?.userId;

  if (!bookingId || !userId) {
    throw new Error("Webhook failed: Missing metadata fields");
  }

  // update booking and payment status 
  await prisma.$transaction(async (tx) => {
    
    // update booking status
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: PaymentStatus.PAID, 
      },
    });

    // update payment table into db
    await tx.payment.upsert({
      where: { bookingId: bookingId },
      create: {
        bookingId: bookingId,
        customerId: userId, 
        status: PaymentStatus.PAID, 
      },
      update: {
        status: PaymentStatus.PAID,
        updatedAt: new Date(),
      },
    });
  });

  
};


//  if payment failed (checkout.session.expired)
const handleBookingPaymentFailed = async (session: Stripe.Checkout.Session) => {
  const bookingId = session.metadata?.bookingId;

  if (!bookingId) return;

  
  await prisma.payment.update({
    where: { bookingId: bookingId },
    data: {
      status: PaymentStatus.FAILED, 
      updatedAt: new Date(),
    },
  });
  
 
};


// get all payment history for a customer 
const getAllPaymentHistory=async(customerId:string)=>{

  if(!customerId){
    throw new Error("Customer id is required")
  }


  const paymentHistory=await prisma.payment.findMany({
    where:{
      customerId:customerId
    }
  })

  return paymentHistory;

}
// get all payment history for a customer 
const getSinglePaymentHistory = async (id:string) => {
  if (!id) {
    throw new Error(" id is required");
  }

  const paymentHistory = await prisma.payment.findUnique({
    where: {
      id
    
    }
  });

  return paymentHistory;
};


export const paymentService={
    createCheckOut,
    handleWebhook,
    getAllPaymentHistory,
    getSinglePaymentHistory
    
}