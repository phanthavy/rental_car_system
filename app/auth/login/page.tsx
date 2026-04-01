"use client";

import { loginAction } from "@/app/aciton/action";
import PopupResetPassword from "@/components/PopupResetPassword";
import { Role } from "@/libs/role";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

type FormState = {
  error?: string;
  success?: string;
  user?: { id: number; username: string; role: string };
  token?: string;
  mustReset?: boolean;
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    loginAction,
    {},
  );
  const [showResetPopup, setShowResetPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      Swal.fire({
        title: "Log in successful",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (state.mustReset) {
          setShowResetPopup(true);
          return;
        }

        if (state.user?.role === Role.admin) {
          router.push("/admin/home");
        } else if (state.user?.role === Role.requester) {
          router.push("/requester/requesterHome");
        } else if (state.user?.role === Role.supplier) {
          router.push("/supplier/supplierHome");
        }
      });
    }
  }, [state.user, router, state.mustReset]);

  return (
    <div className="flex items-center justify-center h-full relative">
      {showResetPopup && <PopupResetPassword />}
      <div>
        <div className="mb-20">
          <h1 className="text-center text-3xl text-white">
            오토앤 종합 대차 플랫폼
          </h1>
          <h1 className="text-center text-3xl text-white">Admin System</h1>
        </div>
        <div className="bg-white w-100 p-10 rounded-2xl">
          <form action={formAction}>
            <div>
              <h1 className="mb-4 text-center">Login</h1>
            </div>
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
                {pending ? "loading..." : "로그인​"}
              </button>
            </div>
            <div className="mt-5 text-gray-500 underline">
              <p>
                No account yet?{" "}
                <a href="/auth/register" className="hover:text-gray-600">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
