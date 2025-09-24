"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { apiFetch } from "@/utils/api";
import Loader from "@/components/feedback/Loader";
import Image from "next/image";
import { Card } from "@/components/atoms/Card/Card";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { LucideIcon, Plus } from "lucide-react";

import {
  MODULES_STUDENT,
  MODULES_INDIVIDUAL,
  MODULES_PROFESSIONAL,
  MODULES_COMPANIES,
} from "@/config/constants";

type Role = {
  id: number;
  roleType: string;
  maxStorageGb: number;
  aiQuota: number;
  pricePerMonth?: number;
  description: string;
};

type Module = {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
};

export default function AccountSettings() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    avatarUrl?: string;
  } | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const MODULES_BY_ROLE: Record<string, Module[]> = {
    STUDENT: MODULES_STUDENT,
    INDIVIDUAL: MODULES_INDIVIDUAL,
    PROFESSIONAL: MODULES_PROFESSIONAL,
    COMPANY: MODULES_COMPANIES,
  };

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
    return (
      <div className="text-center mt-10 text-[var(--text-secondary)]">
        Loading...
      </div>
    );

  console.log("roleType:", user.role.roleType);

  return (
    <div className="flex-1 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-dark)]">
        Account Settings
      </h1>

      <Card variant="default">
        {/* Avatar */}
        <div className="flex relative w-full h-24 mb-6 justify-center">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="rounded-full object-cover border-2 border-[var(--border)]"
              fill
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[var(--border)] flex items-center justify-center text-xl font-bold text-[var(--text-dark)]">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
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
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
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
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
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

        {/* Account */}
        <div className="border-t border-[var(--border)] mt-10"></div>
        <div className="w-full space-y-4 mt-10">
          {/* User Plan */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
              Your Plan
            </label>
            <input
              type="text"
              name="plan"
              value={user.role.roleType}
              readOnly
              className="p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--text-dark)] cursor-not-allowed focus:outline-none transition"
            />
          </div>

          {/* Max Storage */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
              Max Storage
            </label>
            <input
              type="text"
              value={`${user.role.maxStorageGb} GB`}
              readOnly
              className="p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--text-dark)] cursor-not-allowed focus:outline-none transition"
            />
          </div>

          {/* AI Quota */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
              AI Quota
            </label>
            <input
              type="text"
              value={user.role.aiQuota}
              readOnly
              className="p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--text-dark)] cursor-not-allowed focus:outline-none transition"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
              Price / Month
            </label>
            <input
              type="text"
              value={
                user.role.pricePerMonth !== undefined
                  ? `$${user.role.pricePerMonth}`
                  : "Free"
              }
              readOnly
              className="p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--text-dark)] cursor-not-allowed focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-[var(--text-secondary)]">
              Description
            </label>
            <textarea
              value={user.role.description}
              readOnly
              className="p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--text-dark)] cursor-not-allowed focus:outline-none transition resize-none"
              rows={3}
            />
          </div>

          {/* Modules */}
          <div className="border-t border-[var(--border)] mt-10"></div>
          <div className="flex flex-col align-middle justify-center">
            <h2 className="text-2xl mt-2 mb-4 font-bold">Modules</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
              {MODULES_BY_ROLE[user.role.roleType]?.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} />
              ))}
              <Card variant="feature" className="border-[var(--success)] hover:border-[var(--success)] p-6 md:p-10">
                <h3 className="mb-3 flex flex-col items-center gap-2 text-lg font-semibold text-[var(--text-dark)]">
                  <Plus size={20} />
                  <span>View Modules</span>
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">Purchase the Modules you need</p>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
