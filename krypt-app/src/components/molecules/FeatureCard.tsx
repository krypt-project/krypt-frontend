import { Card } from "@/components/atoms/Card/Card";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
};

export function FeatureCard({
  icon: Icon,
  color,
  title,
  desc,
}: FeatureCardProps) {
  return (
    <Card
      variant="feature"
      className="p-6 md:p-10 flex flex-col justify-between w-[300px] h-[200px] flex-shrink-0 overflow-hidden"
    >
      {/* Header : icon + title */}
      <div className="flex flex-col items-start gap-2 min-h-[60px]">
        <Icon size={20} color={color} />
        <h3 className="text-lg font-semibold text-[var(--text-dark)] line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 min-h-[3rem]">
        {desc}
      </p>
    </Card>
  );
}
