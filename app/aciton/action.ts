"use server";

import { Role } from "@/libs/role";
import { prisma } from "@/libs/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { signToken } from "@/libs/auth";

export async function registerAction(prev: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const roles = formData.get("role") as string;

  const roleMap: Record<string, Role> = {
    admin: Role.admin,
    requester: Role.requester,
    supplier: Role.supplier,
  };
  const roless = roleMap[roles];

  //validation
  if (!username || !password || !roless) {
    return { error: "모든 항목을 작성해 주세요!" };
  }

  const exist = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  //check user exists
  if (exist) {
    return { error: "이메일이 이미 존재합니다!" };
  }

  //hashed password
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: username,
      password: hashed,
      role: roless,
    },
  });

  return { success: "Register success" };
}

// ------------------------------------------------------------------------------
type FormState = {
  error?: string;
  success?: string;
  user?: { id: number; username: string; role: string };
  token?: string;
  mustResetPassword?: boolean;
};

export async function loginAction(
  prev: any,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "모든 항목을 작성해 주세요!" };
  }

  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    return { error: "아이디 또는 비밀번호를 잘못 입력했습니다!" };
  }

  const comparePw = await bcrypt.compare(password, user.password);
  if (!comparePw) {
    return { error: "아이디 또는 비밀번호를 잘못 입력했습니다!" };
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role as Role,
  };

  const token = signToken(payload);
  const cookiesStore = await cookies();

  cookiesStore.set({
    name: "userId",
    value: String(user.id),
    path: "/",
    httpOnly: true,
  });
  cookiesStore.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
  });

  return { success: "Login success", user: payload, token };
}

// ----------------------------------------------------------

// export async function resetPasswordAction(
//   prev: ResetPasswordState,
//   formData: FormData,
// ): Promise<ResetPasswordState> {
//   const newPassword = formData.get("newPassword") as string;
//   const confirmPassword = formData.get("confirmPassword") as string;

//   if (!newPassword || !confirmPassword) {
//     return { error: "모든 항목을 작성해 주세요!" };
//   }
//   if (newPassword.length < 8) {
//     return { error: "비밀번호는 8자 이상이어야 합니다." };
//   }
//   if (newPassword !== confirmPassword) {
//     return { error: "비밀번호가 일치하지 않습니다." };
//   }

//   const cookiesStore = await cookies();
//   const userId = cookiesStore.get("userId")?.value;

//   if (!userId) {
//     return { error: "인증 정보가 없습니다. 다시 로그인해주세요." };
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const user = await prisma.user.update({
//       where: { id: Number(userId) },
//       data: {
//         password: hashedPassword,
//         mustResetPassword: false,
//       },
//     });

//     const payload = {
//       id: user.id,
//       username: user.username,
//       role: user.role as Role,
//     };
//     const token = signToken(payload);

//     cookiesStore.set({
//       name: "token",
//       value: token,
//       path: "/",
//       httpOnly: true,
//     });

//     cookiesStore.delete("must_reset_password");

//     return { success: "비밀번호가 성공적으로 변경되었습니다.", role: user.role };
//   } catch {
//     return { error: "오류가 발생했습니다. 다시 시도해주세요." };
//   }
// }
