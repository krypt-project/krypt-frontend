"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input";

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: (credentials: { email: string; password: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="gradient"
        className="w-full justify-center"
      >
        Login
      </Button>
    </form>
  );
}
