"use client";
import { resetPasswordAction } from "@/app/aciton/resetPassoword";
import { useActionState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type formState = {
  error?: string;
  success?: string;
};

export default function ResetPassword() {
  const [state, formAction, pending] = useActionState<formState, FormData>(
    resetPasswordAction,
    {},
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      Swal.fire({
        icon: "success",
        text: "reset password success, please login again",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router.push("/auth/login");
      });
    }                                                             
  }, [router, state.success]);

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
            <div>
              <h1 className="mb-4 text-center">Reset Password</h1>
            </div>
            <div className="flex flex-col gap-3">
              <input
                name="initialPassword"
                type="text"
                className="border border-gray-400 rounded-md py-2 px-2"
                placeholder="password"
              />
              <input
                name="confirmPassword"
                type="password"
                className="border border-gray-400 rounded-md py-2 px-2"
                placeholder="confirm password"
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
                {pending ? "loading..." : "confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
