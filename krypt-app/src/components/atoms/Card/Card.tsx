import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import Button from "@/components/atoms/Button/Button";
import { Check } from "lucide-react";

type CardProps = {
  children?: ReactNode;
  className?: string;
  variant?: "default" | "feature" | "pricing" | "ghost" | "auth";
  title?: string;
  description?: string;
  price?: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: string[];
};

export function Card({
  children,
  className,
  variant = "default",
  title,
  description,
  price,
  ctaLabel,
  ctaHref,
  features,
}: CardProps) {
  const base =
    "relative rounded-2xl border backdrop-blur-md transition-shadow cursor-pointer flex flex-col";

  const variants = {
    default: "bg-[var(--background)] border-[var(--border)] shadow-sm p-6",
    feature: cn(
      "bg-[var(--background)] border-[var(--border)] text-[var(--secondary)] p-6 md:p-10",
      "hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)] hover:scale-[1.02] transition-transform duration-300"
    ),
    pricing:
      "bg-[var(--background)] border-[var(--border)] shadow-lg hover:shadow-xl p-8 text-center flex flex-col",
    ghost: "bg-transparent border-transparent shadow-none",
    auth: "bg-[var(--background)] border-[var(--border)] shadow-md p-8 text-center",
  };

  return (
    <div className={cn(base, variants[variant], className)}>
      {title && (
        <h3
          className={cn(
            "mb-4 font-semibold",
            variant === "auth" ? "text-3xl text-center" : "text-lg"
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          {description}
        </p>
      )}

      {/* Pricing */}
      {variant === "pricing" && price && (
        <div className="mb-6">
          <span className="text-4xl font-bold text-[var(--text-dark)]">{price}</span>
          <span className="text-[var(--text-secondary)] text-sm"> /mo</span>
        </div>
      )}

      {/* Features avec check vert */}
      {variant === "pricing" && features && (
        <ul className="mb-6 space-y-2 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[var(--success)] flex-shrink-0" />
              <span className="text-[var(--text-secondary)]">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Custom content */}
      {children && <div className="mt-auto">{children}</div>}

      {/* CTA */}
      {ctaLabel && ctaHref && (
        <div className="mt-auto">
          <Button
            href={ctaHref}
            variant={variant === "feature" ? "outlined" : "gradient"}
            size="md"
            rounded
            className="w-full"
          >
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
