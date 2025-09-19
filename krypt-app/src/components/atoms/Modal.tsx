"use client";

import { ReactNode } from "react";
import Button from "@/components/atoms/Button/Button";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

type ModalVariant = "default" | "billing" | "auth" | "info";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  variant?: ModalVariant;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  variant = "default",
  className,
}: ModalProps) {
  if (!isOpen) return null;

  const baseStyle = "fixed inset-0 z-50 flex items-center justify-center";
  const overlayStyle = "fixed inset-0 bg-black/30";
  const panelVariants: Record<ModalVariant, string> = {
    default: "bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full",
    billing: "bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full",
    auth: "bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center",
    info: "bg-white rounded-xl shadow-md p-6 w-full max-w-md",
  };

  return (
    <div className={baseStyle}>
      <div className={overlayStyle} onClick={onClose}></div>
      <div className={cn(panelVariants[variant], className, "relative z-10")}>
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
        <Button
          variant="outlined"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}
