"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, FileText, Settings, LogOut } from "lucide-react";

import Button from "@/components/atoms/Button";

type Activity = "home" | "notes" | "settings";

interface ActivityBarProps {
  active: Activity | null;
  onSelect: (activity: Activity) => void;
}

export default function ActivityBar({ active, onSelect }: ActivityBarProps) {
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const logoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL;

      if (!logoutUrl) {
        throw new Error("La variable NEXT_PUBLIC_LOGOUT_URL n'est pas définie");
      }

      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Logout failed: ${error}`);
      }

      localStorage.clear();
      window.location.href = "/login-register?mode=login";
    } catch (err) {
      console.error(err);
      alert("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-16 bg-[var(--background)] text-[var(--text-dark)] flex flex-col items-center py-2 space-y-4 border-r border-gray-200">
      <div className="flex items-center justify-center h-15 border-b border-[var(--border)] w-full">
        <Image
          src="/favicon-2.png"
          alt="Krypt Logo"
          width={50}
          height={50}
          className="mb-2"
        />
      </div>
      <Button
        onClick={() => onSelect("home")}
        variant="sidebar"
        className={`p-2 ${
          active === "home" ? "bg-[var(--secondary)] text-[var(--primary)]" : ""
        }`}
        title="Home"
      >
        <Home size={20} />
      </Button>

      <Button
        onClick={() => onSelect("notes")}
        variant="sidebar"
        className={`p-2 ${
          active === "notes"
            ? "bg-[var(--secondary)] text-[var(--primary)]"
            : ""
        }`}
        title="Notes"
      >
        <FileText size={20} />
      </Button>

      <Button
        onClick={() => onSelect("settings")}
        variant="sidebar"
        className={`p-2 ${
          active === "settings"
            ? "bg-[var(--secondary)] text-[var(--primary)]"
            : ""
        }`}
        title="Settings"
      >
        <Settings size={20} />
      </Button>
      <Button
        onClick={logout}
        variant="sidebar"
        className={`p-2 text-[var(--error)] bg-[var(--error)]/20`}
        title="Logout"
      >
        <LogOut size={20} />
      </Button>
    </div>
  );
}
