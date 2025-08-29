import Link from "next/link";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "gradient" | "link" | "sidebar";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
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
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  // Base styles
  const baseStyles =
    "inline-flex items-center font-medium transition-colors focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2";

  // Variants
  const variants = {
    default: "bg-[var(--primary)] text-white hover:bg-[var(--background-3)]",
    outlined:
      "border border-[var(--border)] text-[var(--foreground)] bg-[var(--background)]/70 hover:bg-[var(--secondary)]",
    gradient:
      "bg-gradient-to-r from-[var(--background-2)] to-[var(--primary)] text-white hover:opacity-90",
    link: "text-sm text-gray-500 hover:text-black transition-colors focus:outline-none focus:ring-0",
    sidebar: "flex items-center w-full p-2 rounded hover:bg-gray-200 transition cursor-pointer",
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
    >
      {content}
    </button>
  );
}
