import { prisma } from "../../lib/prisma";
import { ICreateReviewPayload } from "./review.interface";

const giveReviewForTechnician = async (
  payload: ICreateReviewPayload,
  customerId: string,
) => {
  const { bookingId, technicianId, rating, comment } = payload;

  const postReview=await prisma.review.create({
    data:{
        bookingId,
        technicianId,
        rating:Number(rating),
        comment,
        customerId

    }
  })

  return postReview;
};


export const reviewService={
    giveReviewForTechnician
}