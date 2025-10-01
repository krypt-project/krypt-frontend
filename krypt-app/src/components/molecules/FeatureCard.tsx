import { Card } from "@/components/atoms/Card/Card";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
  width?: string;
  height?: string; 
};

export function FeatureCard({
  icon: Icon,
  color,
  title,
  desc,
  width = "300px", // Par défaut pour Marketplace
  height = "200px", // Par défaut pour Marketplace
}: FeatureCardProps) {
  return (
    <Card
      variant="feature"
      className={`p-3 md:p-6 flex flex-col justify-start w-[${width}] h-[${height}] flex-shrink-0 overflow-hidden`}
    >
      <div className="flex flex-col gap-2">
          <Icon size={20} color={color} />
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] line-clamp-3">
            {title}
          </h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-4 mt-2">
          {desc}
        </p>
      </div>
    </Card>
  );
}
