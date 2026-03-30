import { Role } from "./role";

export type jwtpayloadtype = {
  id: number;
  username: string;
  role: Role;
};