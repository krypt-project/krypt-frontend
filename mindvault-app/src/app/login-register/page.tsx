"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background-2)]/10 to-[var(--primary)]/25 px-4">
      <Button href="/" variant="outlined" className="absolute top-4 left-4">
        <ArrowLeft />
        Back to Home
      </Button>
      <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}
