"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Home, FileText, Settings, LogOut } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Popup from "@/components/atoms/Popup";

type Activity = "home" | "notes" | "settings";

interface ActivityBarProps {
  active: Activity | null;
  onSelect: (activity: Activity) => void;
}

export default function ActivityBar({ active, onSelect }: ActivityBarProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  } | null>(null);
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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userInfoUrl = process.env.NEXT_PUBLIC_USERINFO_URL;
      if (!userInfoUrl) {
        console.error("NEXT_PUBLIC_USERINFO_URL is not defined");
        return;
      }

      const res = await fetch(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch user data");
        return;
      }

      const data = await res.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-16 bg-[var(--background)] text-[var(--text-dark)] flex flex-col items-center py-2 space-y-4 border-r border-[var(--border)]">
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
          active === "home" || active === null
            ? "bg-[var(--secondary)] text-[var(--primary)]"
            : ""
        }`}
        title="Home"
      >
        <Home size={20} />
      </Button>

      <Popup content={<span>Home</span>} position="right">
        <Button
          onClick={() => onSelect("home")}
          variant="sidebar"
          className={`p-2 ${
            active === "home" || active === null
              ? "bg-[var(--secondary)] text-[var(--primary)]"
              : ""
          }`}
          title="Home"
        >
          <Home size={20} />
        </Button>
      </Popup>

      <Popup content={<span>Notes</span>} position="right">
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
      </Popup>

      <div className="mt-auto flex flex-col items-center space-y-4 mb-7">
        <Popup content={<span>Settings</span>} position="right">
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
        </Popup>

        <Popup content={<span>Logout</span>} position="right">
          <Button
            onClick={logout}
            variant="sidebar"
            className={`p-2 text-[var(--text-dark)] bg-[var(--error)]/50 hover:text-[var(--error)]`}
            title="Logout"
          >
            <LogOut size={20} />
          </Button>
        </Popup>
      </div>

      {/* User avatar with popup */}
      {user && (
        <div className="relative mb-4">
          <Popup
            content={
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
              </div>
            }
            position="right"
          >
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="rounded-full object-cover border-2 border-[var(--border)] cursor-pointer"
                fill
              />
            ) : (
              <div className="w-13 h-13 rounded-full bg-[var(--border)] flex items-center justify-center text-md font-bold text-[var(--text-dark)] cursor-pointer">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
            )}
          </Popup>
        </div>
      )}
    </div>
  );
}
