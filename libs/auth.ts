
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = "secret_key";

export function verifyToken(token: string){
  return jwt.verify(token, SECRET)
}

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
