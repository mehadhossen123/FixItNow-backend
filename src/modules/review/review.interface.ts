export interface ICreateReviewPayload {
  bookingId: string;
  technicianId: string;
  rating: number; 
  comment?: string; 
}
