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
      "rounded-xl border border-[var(--border)] bg-[var(--text-light)] text-[var(--text-dark)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)]";

    const typeClasses =
      type === "color"
        ? "cursor-pointer p-0 w-6 h-6 border-0 overflow-hidden focus:ring-0 focus:border-0 focus:outline-none focus:shadow-none"
        : "px-4 py-2";

    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <label className="mb-1 text-sm font-medium text-[var(--text-secondary)]">
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
            error && "border-[var(--error)] focus:ring-[var(--error)]"
          )}
        />
        {error && <span className="mt-1 text-xs text-[var(--error)]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
