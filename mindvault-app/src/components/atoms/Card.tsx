import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "feature" | "pricing" | "ghost";
};

export function Card({ children, className, variant = "default" }: CardProps) {
  const base = "relative rounded-2xl border backdrop-blur-md transition-shadow";

  const variants = {
    default: "bg-white border-gray-200 shadow-sm",
    feature: "bg-gray-900/30 border-white/10 text-gray-300",
    pricing: "bg-white border-gray-100 shadow-lg hover:shadow-xl",
    ghost: "bg-transparent border-transparent shadow-none",
  };

  return (
    <div className={cn(base, variants[variant], className)}>{children}</div>
  );
}
