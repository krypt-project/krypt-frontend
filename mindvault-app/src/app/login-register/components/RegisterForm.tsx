"use client";

import { useState } from "react";

export default function RegisterForm({
  onSubmit,
}: {
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-tr from-[#D56434] to-[#6D66E7] text-white py-2 rounded hover:opacity-90 transition cursor-pointer"
      >
        Register
      </button>
    </form>
  );
}
