"use client";

import { useRouter } from "next/navigation";

export default function AccountVerifiedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Account Verified !
        </h1>
        <p className="text-gray-700 mb-6">
          Your email address has been confirmed. You can now access your
          dashboard.
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gradient-to-tr from-[#D56434] to-[#6D66E7] hover:from-[#D56434]/90 hover:to-[#6D66E7]/90 text-white font-medium px-5 py-2 rounded-lg shadow-md transition cursor-pointer"
        >
          Access Dashboard
        </button>
      </div>
    </main>
  );
}
