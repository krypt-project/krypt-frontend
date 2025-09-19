// /components/atoms/Badge.tsx
"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface BadgeProps {
  text: string;
  color?: string;
  className?: string;
  link?: string;
  onClick?: () => void;
  selectable?: boolean;
}

export default function Badge({
  text,
  color = "blue",
  className,
  link,
  onClick,
  selectable = false,
}: BadgeProps) {
  const [selected, setSelected] = useState(false);

  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-[var(--text-dark)]",
    outlined:
      "bg-[var(--background)] text-[var(--text-dark)] border border-[var(--border)] hover:bg-[var(--secondary)] transition",
    warning:
      "bg-[var(--warning)]/30 text-[var(--foreground)] font-semibold glowing-warning",
    error:
      "bg-[var(--error)]/30 text-[var(--foreground)] font-semibold glowing-error",
    success:
      "bg-[var(--success)]/30 text-[var(--foreground)] font-semibold glowing-success",
  };

  const baseClasses = `cursor-pointer inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full select-none transition-colors`;

  const handleClick = () => {
    if (selectable) {
      setSelected((prev) => !prev);
    }
    if (onClick) {
      onClick();
    }
  };

  const content = (
    <span
      onClick={handleClick}
      className={`${baseClasses} ${className} ${
        selected ? "bg-[var(--success)]/25 text-[var(--success)] border border-[var(--success)]/50" : colors[color] || colors.blue
      }`}
    >
      {selected && <Check size={14} />}
      {text}
    </span>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
