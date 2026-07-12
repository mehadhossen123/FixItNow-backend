import { Role } from "../../../generated/prisma/enums"

export interface PayloadUser{
    name:string
    email:string
    password:string
    role:Role
    location:string

}