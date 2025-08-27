"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthCard from "@/app/login-register/components/AuthCard";

export default function LoginRegisterPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (mode === "register") setIsLogin(false);
    else setIsLogin(true);
  }, [mode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Link
        href="/"
        className="absolute top-4 left-4 text-sm text-gray-600 hover:text-gray-800 underline"
      >
        <ArrowLeft className="mr-1 inline-block" />
        Back to Home
      </Link>
      <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}
