"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import { apiFetch } from "@/utils/api";
import Loader from "@/components/feedback/Loader";
import Image from "next/image";

export default function AccountSettings() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  } | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch("/users/me");
        setUser(data);
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const updatedUser = await apiFetch(`/users/${user.email}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="flex-1 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-dark)]">
        Account Settings
      </h1>

      <div className="bg-[var(--background)] shadow-md rounded-lg p-6 space-y-6 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 mb-6">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="rounded-full object-cover border-2 border-[var(--border)]"
              fill
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[var(--border)] flex items-center justify-center text-xl font-bold text-[var(--text-light)]">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="p-3 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:border-[var(--border)] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="p-3 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:border-[var(--border)] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-3 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:border-[var(--border)] transition"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave} variant="success" disabled={loading}>
              {loading ? <Loader variant="inline" size={24} /> : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
