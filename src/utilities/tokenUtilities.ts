import { JwtPayload, SignOptions } from "jsonwebtoken";
import Jwt  from "jsonwebtoken";

// make token
export const makeToken = (payload: JwtPayload, secret: string, expires_in:SignOptions) => {
  const token = Jwt.sign(payload, secret,  expires_in );
  return token;
};



