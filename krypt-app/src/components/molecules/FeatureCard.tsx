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
    <Card variant="feature" className="p-6 md:p-10">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
        <Icon size={20} strokeWidth={2} color={color} />
        <span>{title}</span>
      </h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </Card>
  );
}
