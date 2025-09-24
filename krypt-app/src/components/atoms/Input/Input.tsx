import { cn } from "@/utils/cn";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
  variant?: "default" | "shadow";
  multiline?: boolean;
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    { label, error, className, type, variant = "default", multiline, ...props },
    ref
  ) => {
    const baseClasses =
      "rounded-xl bg-[var(--background)] text-[var(--text-dark)] placeholder-[var(--text-secondary)] focus:outline-none";

    const variants = {
      default:
        "border border-[var(--border)] focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)]",
      shadow:
        "shadow border-[var(--border)] focus:ring-1 focus:ring-[var(--border)] focus:border-[var(--border)]",
    };

    const typeClasses =
      type === "color"
        ? "cursor-pointer p-0 w-6 h-6 border-0 overflow-hidden focus:ring-0"
        : "px-4 py-2";

    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <label className="mb-1 text-sm font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn(
              baseClasses,
              variants[variant],
              "resize-none px-4 py-2 min-h-[2.5rem]",
              error && "border-[var(--error)] focus:ring-[var(--error)]"
            )}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            className={cn(
              baseClasses,
              variants[variant],
              typeClasses,
              error && "border-[var(--error)] focus:ring-[var(--error)]"
            )}
          />
        )}

        {error && (
          <span className="mt-1 text-xs text-[var(--error)]">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
