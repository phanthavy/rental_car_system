import jwt from "jsonwebtoken";

const SECRET = "secret_key";

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
