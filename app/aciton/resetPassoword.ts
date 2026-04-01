"use server";
import { hashPassword } from "@/libs/auth";
import { prisma } from "@/libs/db";
import { cookies } from "next/headers";

export async function resetPasswordAction(previous: any, formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) return { error: "Unauthorized!" };

  const initialPassword = formData.get("initialPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!initialPassword || !confirmPassword)
    return { error: "please fill up all field!" };

  if (initialPassword.length < 6)
    return { error: "password must be more than 6 characters" };

  if (initialPassword !== confirmPassword)
    return { error: "password is not match" };

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  if (!user) return { error: "user not found!" };

  const hashed = await hashPassword(initialPassword);

  const result = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      password: hashed,
      mustResetPassword: false,
    },
  });

  cookieStore.delete("userId");
  cookieStore.delete("token");
  cookieStore.delete("mustResetPassword");

  return { success: "reset password successfully" };
}
