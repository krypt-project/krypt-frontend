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
      className="
        p-4 md:p-6 
        flex flex-col 
        justify-start 
        rounded-2xl 
        shadow-sm 
        h-full
      "
    >
      <div className="flex flex-col gap-2 flex-grow">
        <Icon size={24} color={color} />
        <h3 className="text-lg font-semibold text-[var(--text-dark)] line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-4 mt-1 flex-grow">
          {desc}
        </p>
      </div>
    </Card>
  );
}
