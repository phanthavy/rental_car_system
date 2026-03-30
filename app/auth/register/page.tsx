"use client";

import { registerAction } from "@/app/aciton/action";
import { useActionState } from "react";

type FormSate = {
  error?: string;
  success?: string;
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState<FormSate, FormData>(
    registerAction,
    {},
  );
  
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
              <select
                name="role"
                className="border border-gray-400 rounded-md p-2"
              >
                <option value="" disabled>select role</option>
                <option value="admin">admin</option>
                <option value="supplier">supplier</option>
                <option value="requester">requester</option>
              </select>
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
            <div className="mt-5 text-gray-500 underline">
              <p>
                Already have an account?{" "}
                <a href="/auth/login" className="hover:text-gray-600">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
