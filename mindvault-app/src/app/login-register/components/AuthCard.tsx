"use client";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useRouter } from "next/navigation";

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
    <div className="w-full max-w-md rounded-2xl backdrop-blur-xl shadow-lg border border-gray-200 bg-white/70 p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isLogin ? "Login" : "Register"}
      </h2>

      {isLogin ? (
        <LoginForm onSubmit={handleLogin} />
      ) : (
        <RegisterForm onSubmit={handleRegister} />
      )}

      <div className="text-center mt-6 text-sm text-gray-600">
        {isLogin ? (
          <>
            Don&apos;t have an account yet ?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-600 hover:underline font-medium"
            >
              Registration
            </button>
          </>
        ) : (
          <>
            Already have an account ?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
