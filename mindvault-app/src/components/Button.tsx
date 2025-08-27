import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const base =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm cursor-pointer font-medium transition-all group";

  const variants = {
    primary:
      "bg-gradient-to-tr from-[#D56434] to-[#6D66E7] text-white shadow-lg hover:scale-105",
    secondary: "border border-gray-800 text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  };

  return (
    <Comp className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Comp>
  );
}
