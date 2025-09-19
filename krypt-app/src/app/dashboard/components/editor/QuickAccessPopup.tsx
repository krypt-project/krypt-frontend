"use client";

import React from "react";
import Button from "@/components/atoms/Button/Button";
import Loader from "@/components/feedback/Loader";

interface QuickAccessPopupProps {
  isOpen: boolean;
  x: number;
  y: number;
  onClose: () => void;
  onGenerateTags: () => void;
  loading?: boolean;
}

export default function QuickAccessPopup({
  isOpen,
  x,
  y,
  onClose,
  onGenerateTags,
  loading = false,
}: QuickAccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-white border border-[var(--border)] rounded-xl shadow-lg p-2 z-50"
      style={{ top: y, left: x, minWidth: 150 }}
      onMouseLeave={onClose}
    >
      <Button
        onClick={onGenerateTags}
        variant="outlined"
        className="w-full mb-1 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <Loader variant="inline" size={24} /> : "Generate Tags"}
      </Button>

      <Button onClick={onClose} variant="default" className="w-full">
        Close
      </Button>
    </div>
  );
}
