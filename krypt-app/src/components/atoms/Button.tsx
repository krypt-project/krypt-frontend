import Link from "next/link";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "gradient" | "link" | "sidebar" | "error" | "warning" | "success";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  title?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "default",
  size = "md",
  rounded = false,
  loading = false,
  icon,
  href,
  className,
  title,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  // Base styles
  const baseStyles =
    "inline-flex items-center font-medium transition focus:outline-none cursor-pointer focus:ring-1 focus:ring-offset-1";

  // Variants
  const variants = {
    default: "bg-[var(--primary)] text-[var(--text-light)] hover:bg-[var(--background-3)]",
    outlined:
      "border border-[var(--border)] text-[var(--foreground)] bg-[var(--background)]/70 hover:bg-[var(--secondary)]",
    gradient:
      "bg-gradient-to-r from-[var(--background-2)] to-[var(--primary)] text-[var(--text-light)] hover:opacity-90",
    link: "text-sm text-[var(--text-secondary)] hover:text-[var(--text-dark)] transition-colors focus:outline-none focus:ring-0",
    sidebar: "p-2 rounded hover:bg-[var(--border)]/50 transition cursor-pointer",
    error: "bg-[var(--error)] text-[var(--text-light)] hover:opacity-90",
    warning: "bg-[var(--warning)] text-[var(--text-light)] hover:opacity-90",
    success: "bg-[var(--success)] text-[var(--text-light)] hover:opacity-90",
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Rounded
  const shape = rounded ? "rounded-full" : "rounded-xl";

  // Loading
  const isDisabled = loading || disabled;

  const content = (
    <span className="flex items-center gap-2">
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {icon && !loading && icon}
      {children}
    </span>
  );

  const classes = cn(
    baseStyles,
    variant === "link" ? "focus:outline-none focus:ring-0" : variants[variant],
    sizes[size],
    shape,
    isDisabled ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={isDisabled}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={isDisabled}
      title={title}
    >
      {content}
    </button>
  );
}
