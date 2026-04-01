import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./auth";
import { Role } from "./role";
import { jwtpayloadtype } from "./jwt";

type TokenPayload = jwtpayloadtype;

export async function checkAuth(allowedRoles: Role[]) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) redirect("/auth/login");

  try {
    const user = verifyToken(token) as TokenPayload;

    if (!allowedRoles.includes(user.role)) {
      redirect("/auth/login");
    }
    return user;
  } catch {
    redirect("/auth/login");
  }
}
