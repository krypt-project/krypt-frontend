"use client";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useRouter } from "next/navigation";
import { Card } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

export default function AuthCard({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}) {
  const handleRegister = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error during registration");

      const data = await response.json();
      console.log("Registration successful:", data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const router = useRouter();
  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
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
    }
  };
  return (
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
  );
}
