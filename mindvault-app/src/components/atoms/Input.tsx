import { cn } from "@/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={cn(
            "rounded-xl border border-gray-300 bg-white/80 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)]",
            error ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
        />
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
