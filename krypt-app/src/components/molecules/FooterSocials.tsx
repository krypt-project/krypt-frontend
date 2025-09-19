import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

type Social = {
  href: string;
  label: string;
  icon: React.ReactNode;
  hoverColor: string;
};

const socials: Social[] = [
  {
    href: "#",
    label: "Twitter",
    icon: <Twitter className="h-6 w-6" />,
    hoverColor: "hover:text-[var(--primary)]",
  },
  {
    href: "#",
    label: "Github",
    icon: <Github className="h-6 w-6" />,
    hoverColor: "hover:text-[var(--primary)]",
  },
  {
    href: "#",
    label: "Linkedin",
    icon: <Linkedin className="h-6 w-6" />,
    hoverColor: "hover:text-[var(--primary)]",
  },
];

export function FooterSocials() {
  return (
    <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
      <h3 className="text-[var(--text-dark)] font-medium">Follow us</h3>
      <div className="flex gap-3">
        {socials.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className={s.hoverColor}
          >
            {s.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
