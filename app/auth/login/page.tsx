"use client";

import { loginAction } from "@/app/aciton/action";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useEffect } from "react";

type FormState = {
  error?: string;
  success?: string;
  user?: { id: number; username: string; role: string };
  token?: string
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    loginAction,
    {},
  );
  const router = useRouter();

  useEffect(() => {
    if (!state.user) return;

    switch (state.user.role) {
      case "admin":
        router.push("/admin/home");
        break;
      case "supplier":
        router.push("/supplier/supplierHome");
        break;
      case "requester":
        router.push("/requester/requesterHome");
        break;
    }
  }, [state.user, router]);

  return (
    <div className="flex items-center justify-center h-full relative">
      <div>
        <div className="mb-20">
          <h1 className="text-center text-3xl text-white">
            오토앤 종합 대차 플랫폼
          </h1>
          <h1 className="text-center text-3xl text-white">Admin System</h1>
        </div>
        <div className="bg-white w-100 p-10 rounded-2xl">
          <form action={formAction}>
            <div className="flex flex-col gap-3">
              <input
                name="username"
                type="text"
                className="border border-gray-400 rounded-md py-2 px-2"
                placeholder="아이디"
              />
              <input
                name="password"
                type="password"
                className="border border-gray-400 rounded-md py-2 px-2"
                placeholder="비밀번호​"
              />
            </div>

            {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
            {state.success && (
              <p className="text-green-500 mt-2">{state.success}</p>
            )}

            <div className="mt-3">
              <button
                disabled={pending}
                type="submit"
                className="bg-gray-800 w-full py-2 text-white rounded-md"
              >
                로그인​
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
