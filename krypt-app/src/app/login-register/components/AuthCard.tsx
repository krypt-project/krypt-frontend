"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Card } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loader from "@/components/feedback/Loader";

export default function AuthCard({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [waitingForEmailVerification, setWaitingForEmailVerification] =
    useState(false);

  const checkEmailVerification = async (email: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERIFY_URL}?email=${email}`
      );
      if (!res.ok) return false;

      const data = await res.json();
      return data.verified;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleRegister = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL;
      if (!registerUrl)
        throw new Error(
          "La variable NEXT_PUBLIC_REGISTER_URL n'est pas définie"
        );

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error during registration");

      const data = await response.json();
      console.log("Registration successful:", data.message);

      setWaitingForEmailVerification(true);

      const interval = setInterval(async () => {
        const verified = await checkEmailVerification(formData.email);
        if (verified) {
          clearInterval(interval);
          setWaitingForEmailVerification(false);
          router.push("/billing");
        }
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;

      if (!loginUrl) {
        throw new Error("La variable LOGIN_URL n'est pas définie");
      }
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {(loading || waitingForEmailVerification) && (
        <div className="fixed inset-0 bg-black/30 flex flex-col items-center justify-center z-50">
          <Loader variant="global" size={40} />
          {waitingForEmailVerification && (
            <Loader
              variant="global"
              message="Please check your email and click the verification link..."
            />
          )}
        </div>
      )}

      <Card
        variant="auth"
        title={isLogin ? "Login" : "Register"}
        className="w-full max-w-md"
      >
        {/* Form */}
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}

        {/* switch login/register */}
        <div className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? (
            <>
              Don&apos;t have an account yet ?{" "}
              <Button
                onClick={() => setIsLogin(false)}
                variant="link"
                className="text-[var(--primary)] hover:underline font-medium cursor-pointer"
              >
                Registration
              </Button>
            </>
          ) : (
            <>
              Already have an account ?{" "}
              <Button
                onClick={() => setIsLogin(true)}
                variant="link"
                className="text-[var(--primary)] hover:underline font-medium"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </Card>
    </>
  );
}
