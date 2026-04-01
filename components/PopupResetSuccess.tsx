"use client";
import { useRouter } from "next/navigation";

export default function PopupResetSuccess() {
  const router = useRouter();
  const handleOk = () => {
    router.push("/auth/resetPassword");
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-bold mb-2">notification</h2>
        <p className="text-gray-600 mb-6">Reset password successfully</p>
        <button
          onClick={handleOk}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          ok
        </button>
      </div>
    </div>
  );
}
