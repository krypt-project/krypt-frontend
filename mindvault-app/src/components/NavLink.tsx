import Link, { LinkProps } from "next/link";
import { cn } from "@/utils/cn";
import React from "react";

type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "footer" | "header";
};

export function NavLink({
  children,
  className,
  variant = "default",
  ...props
}: NavLinkProps) {
  const variants = {
    default: "text-sm font-medium transition hover:text-gray-900",
    header:
      "text-sm font-medium inline-flex items-center justify-center rounded-lg px-3 py-[5px] bg-white text-gray-800 shadow-sm hover:bg-gray-100",
    footer: "text-sm text-gray-400 hover:text-black transition",
  };

  return (
    <Link {...props} className={cn(variants[variant], className)}>
      {children}
    </Link>
  );
}
