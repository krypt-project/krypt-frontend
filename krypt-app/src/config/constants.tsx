{
  /* Hero Section Content */
}
export const HERO_CONTENT = {
  title: "Your ideas, connected and organized",
  description:
    "Krypt is your intelligent knowledge base - capture, link, and resurface insights effortlessly. Built for thinkers, creators, and lifelong learners.",
  primaryCta: "Try Krypt for Free",
  secondaryCta: "Learn More",
  placeholder: "Demo App",
};

{
  /* Features Section Content */
}
import {
  BrainCog,
  Search,
  CalendarDays,
  Sparkles,
  FileText,
  RefreshCcw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const FEATURES_HEADER = {
  title: "Built for clarity, designed for thinkers",
};

export const FEATURES_LIST: {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: BrainCog,
    color: "#D56434",
    title: "Linked Thoughts",
    desc: "Connect notes together like a mind map — discover patterns and connections you didn’t even know were there.",
  },
  {
    icon: Search,
    color: "#6D66E7",
    title: "Fast Search",
    desc: "Search through your entire vault instantly. Everything is indexed, even inside nested pages.",
  },
  {
    icon: CalendarDays,
    color: "#00CFC5",
    title: "Daily Notes",
    desc: "Capture fleeting thoughts, journaling, or planning — a fresh canvas every day to stay focused.",
  },
  {
    icon: Sparkles,
    color: "#D56434",
    title: "AI Summaries",
    desc: "Summarize long notes into key takeaways with one click. Perfect for review or sharing.",
  },
  {
    icon: FileText,
    color: "#6D66E7",
    title: "Markdown & Rich Text",
    desc: "Write how you want — whether plain Markdown or rich formatting with tags, checklists and embeds.",
  },
  {
    icon: RefreshCcw,
    color: "#00CFC5",
    title: "Cross-Platform Sync",
    desc: "Pick up where you left off — your knowledge vault syncs across desktop, tablet and mobile.",
  },
];

{
  /* Testimonials Section Content */
}
export const TESTIMONIAL = {
  quote:
    "Krypt m'aide à capturer mes idées, à structurer ma pensée, et à revenir facilement sur ce qui compte. ",
  emphasized: "C'est littéralement mon second cerveau.",
  author: "Pierre Roche",
  role: "Cognitive Coach",
};

{
  /* Footer Content */
}
export const FOOTER = {
  product: {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog"],
  },
  company: {
    title: "Company",
    links: ["About Krypt", "Careers", "Privacy & Terms", "Contact"],
  },
  resources: {
    title: "Resources",
    links: ["Blog", "Support", "API Docs", "Security"],
  },
  social: {
    title: "Follow us",
    twitterLabel: "Twitter",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  copyright: {
    alt: "Krypt Logo",
    text: `© ${new Date().getFullYear()} Krypt - All rights reserved.`,
  },
};

/* Billing Page */
export const PLANS = [
  {
    roleType: "STUDENT",
    maxStorageGB: 5,
    aiQuota: 1000,
    pricePerMonth: "0.00",
    features: [
      "Free plan",
      "5 GB storage",
      "1000 AI requests/month",
      "Recharge available",
    ],
  },
  {
    roleType: "INDIVIDUAL",
    maxStorageGB: 20,
    aiQuota: 5000,
    pricePerMonth: "9.99",
    features: ["20 GB storage", "5000 AI requests/month", "Recharge available"],
  },
  {
    roleType: "PROFESSIONAL",
    maxStorageGB: 50,
    aiQuota: 20000,
    pricePerMonth: "19.99",
    features: [
      "50 GB storage",
      "20000 AI requests/month",
      "Priority support",
      "Modules available",
    ],
  },
  {
    roleType: "COMPANIES",
    maxStorageGB: 500,
    aiQuota: 100000,
    pricePerMonth: null,
    features: [
      "Custom storage and quotas",
      "Multi-user management",
      "API access",
      "SSO",
      "Reporting",
      "Dedicated support",
      "Modules available",
    ],
  },
];

{
  /*Dashboard Page Content */
}
export const mockNotes = [
  {
    id: 1,
    title: "Note 1",
    content: "# Hello from note 1\nSome **markdown** content.",
  },
  {
    id: 2,
    title: "Note 2",
    content: "## Note 2 content\n- List item 1\n- List item 2",
  },
  { id: 3, title: "Note 3", content: "Simple text for note 3." },
];

{
  /* Modules */
}
import { Book, Bot, Users, Headphones, Cpu, Briefcase } from "lucide-react";

export type Module = {
  title: string;
  desc: string;
  color: string;
  icon: LucideIcon;
};

export const MODULES_STUDENT: Module[] = [
  {
    title: "Notes",
    desc: "Prise de notes simple et rapide avec synchronisation.",
    color: "#222222",
    icon: Book,
  },
  {
    title: "Starter IA",
    desc: "IA de base pour résumer, tagger et rechercher.",
    color: "#222222",
    icon: Bot,
  },
  {
    title: "Support Communautaire",
    desc: "Accédez à la communauté pour de l’aide et des conseils.",
    color: "#222222",
    icon: Users,
  },
];

export const MODULES_INDIVIDUAL: Module[] = [
  ...MODULES_STUDENT,
  {
    title: "Stockage étendu",
    desc: "20 GB d’espace pour vos notes et documents.",
    color: "#222222",
    icon: Briefcase,
  },
];

export const MODULES_PROFESSIONAL: Module[] = [
  ...MODULES_INDIVIDUAL,
  {
    title: "IA Avancée",
    desc: "IA plus puissante pour traiter de plus gros volumes de données.",
    color: "#222222",
    icon: Cpu,
  },
  {
    title: "Support Prioritaire",
    desc: "Accédez à un support client dédié.",
    color: "#222222",
    icon: Headphones,
  },
  {
    title: "Modules à la demande",
    desc: "Ajoutez des extensions (agenda, kanban, etc.).",
    color: "#222222",
    icon: Briefcase,
  },
];

export const MODULES_COMPANIES: Module[] = [
  ...MODULES_PROFESSIONAL,
  {
    title: "Collaboration",
    desc: "Travaillez à plusieurs sur vos notes et projets.",
    color: "#222222",
    icon: Users,
  },
  {
    title: "Rapports & Analytics",
    desc: "Dashboards et statistiques d’utilisation.",
    color: "#222222",
    icon: Cpu,
  },
  {
    title: "Intégrations API & SSO",
    desc: "Connectez Krypt à vos outils existants.",
    color: "#222222",
    icon: Briefcase,
  },
];
