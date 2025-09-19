"use client";

import React from "react";

interface BadgeProps {
  text: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function Badge({
  text,
  color = "blue",
  className,
  onClick,
}: BadgeProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
    outlined:
      "bg-[var(--background)] text-gray-800 border border-[var(--border)] shadow-sm",
    warning:
      "bg-[var(--warning)]/30 text-[var(--foreground)] font-semibold glowing-warning",
    error: "bg-[var(--error)]/30 text-[var(--foreground)] font-semibold glowing-error",
    success: "bg-[var(--success)]/30 text-[var(--foreground)] font-semibold glowing-success",
  };

  return (
    <span
      onClick={onClick}
      className={`cursor-pointer ${className} ${
        colors[color] || colors.blue
      } text-sm px-2 py-1 rounded-full select-none`}
    >
      {text}
    </span>
  );
}
