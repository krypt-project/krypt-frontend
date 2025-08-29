import { cn } from "@/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, type, ...props }, ref) => {
    const baseClasses =
      "rounded-xl border border-gray-300 bg-white/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)]";

    const typeClasses =
      type === "color"
        ? "cursor-pointer p-0 w-6 h-6 border-0 overflow-hidden focus:ring-0 focus:border-0 focus:outline-none focus:shadow-none"
        : "px-4 py-2";

    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(
            baseClasses,
            typeClasses,
            error && "border-red-500 focus:ring-red-500"
          )}
        />
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
