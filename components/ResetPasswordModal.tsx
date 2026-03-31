// "use client";

// // import { resetPasswordAction } from "@/app/aciton/action";
// import { Role } from "@/libs/role";
// import { useRouter } from "next/navigation";
// import { useActionState } from "react";
// import { useEffect } from "react";

// export default function ResetPasswordModal() {
//   const router = useRouter();

//   const [state, formAction, pending] = useActionState< ,FormData>(
//     resetPasswordAction,
//     {},
//   );

//   useEffect(() => {
//     if (state.success) {
//       const timer = setTimeout(() => {
//         if (state.role === Role.admin) router.push("/admin/home");
//         else if (state.role === Role.supplier)
//           router.push("/supplier/supplierHome");
//         else if (state.role === Role.requester)
//           router.push("/requester/requesterHome");
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [state.success, router]);

//   return (
//     <div>
//       <div className="flex items-center justify-center h-full relative">
//         <div>
//           <div className="mb-20">
//             <h1 className="text-center text-3xl text-white">
//               오토앤 종합 대차 플랫폼
//             </h1>
//             <h1 className="text-center text-3xl text-white">Admin System</h1>
//           </div>
//           <div className="bg-white w-100 p-10 rounded-2xl">
//             <form action={formAction}>
//               <div className="text-center mb-4">
//                 <h1>Reset Password</h1>
//               </div>
//               <div className="flex flex-col gap-3">
//                 <input
//                   name="newPassword"
//                   type="text"
//                   className="border border-gray-400 rounded-md py-2 px-2"
//                   placeholder="아이디"
//                 />
//                 <input
//                   name="confirmPassword"
//                   type="password"
//                   className="border border-gray-400 rounded-md py-2 px-2"
//                   placeholder="비밀번호​"
//                 />
//               </div>

//               {state.error && (
//                 <p className="text-red-500 mt-2">{state.error}</p>
//               )}
//               {state.success && (
//                 <p className="text-green-500 mt-2">{state.success}</p>
//               )}

//               <div className="mt-3">
//                 <button
//                   disabled={pending}
//                   type="submit"
//                   className="bg-gray-800 w-full py-2 text-white rounded-md"
//                 >
//                   로그인​
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
