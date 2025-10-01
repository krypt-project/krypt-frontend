import { Card } from "@/components/atoms/Card/Card";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
  width?: string; // Optionnel pour personnaliser dans Settings Profile
  height?: string; // Optionnel pour personnaliser dans Settings Profile
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
      className={`p-4 md:p-6 flex flex-col justify-start w-[${width}] h-[${height}] flex-shrink-0 overflow-hidden`} // Changé justify-between à justify-start pour aligner en haut
    >
      <div className="flex flex-col gap-2">
          {/* Alignement horizontal pour icône + titre */}
          <Icon size={20} color={color} />
        <div className="flex items-center gap-2">
          {" "}
          <h3 className="text-lg font-semibold text-[var(--text-dark)] line-clamp-3">
            {" "}
            {/* Augmenté à 3 lignes */}
            {title}
          </h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-4 mt-2">
          {" "}
          {/* Augmenté à 4 lignes, ajouté mt-2 pour espacement */}
          {desc}
        </p>
      </div>
    </Card>
  );
}
