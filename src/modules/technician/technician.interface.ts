import { BookingStatus } from "../../../generated/prisma/enums";

export interface technicianServicePayload {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  technicianId:string
}

export interface technicianProfilePayload {
  bio?: string;
  experience?: number;
  location?: string;
  slots?:string[]
}


export interface filterPayload{
  location?:string
  experience?:number
}

export interface Status {
  status: BookingStatus;
}