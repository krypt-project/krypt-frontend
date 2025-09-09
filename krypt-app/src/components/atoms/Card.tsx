import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import Button from "@/components/atoms/Button";
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
    "relative rounded-2xl border backdrop-blur-md transition-shadow flex flex-col";

  const variants = {
    default: "bg-white border-gray-200 shadow-sm p-6",
    feature: cn(
      "bg-gray-900/30 border-white/10 text-gray-300 p-6 md:p-10",
      "hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/20 hover:scale-[1.02] transition-transform duration-300"
    ),
    pricing:
      "bg-white border-gray-100 shadow-lg hover:shadow-xl p-8 text-center flex flex-col",
    ghost: "bg-transparent border-transparent shadow-none",
    auth: "bg-white border-gray-200 shadow-md p-8 text-center",
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}

      {/* Pricing */}
      {variant === "pricing" && price && (
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500 text-sm"> /mo</span>
        </div>
      )}

      {/* Features avec check vert */}
      {variant === "pricing" && features && (
        <ul className="mb-6 space-y-2 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
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
