"use client";

import React from "react";

interface BadgeProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

export default function Badge({ text, color = "blue", onClick }: BadgeProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      onClick={onClick}
      className={`cursor-pointer ${
        colors[color] || colors.blue
      } text-sm px-2 py-1 rounded-full select-none`}
    >
      {text}
    </span>
  );
}
