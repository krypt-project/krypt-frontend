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
import {
  Book,
  Bot,
  Users,
  Headphones,
  Cpu,
  Briefcase,
  Calendar,
  Layout,
  Share2,
  Shield,
  Cloud,
  Bell,
  Globe,
  MessageSquare,
  FolderOpen,
  BarChart,
  Code,
  Zap,
} from "lucide-react";
export type Module = {
  title: string;
  desc: string;
  color: string;
  icon: LucideIcon;
  category?: string;
};

export const MODULES_STUDENT: Module[] = [
  {
    title: "Notes",
    desc: "Quick and easy note-taking with synchronization.",
    color: "#00b0cf",
    icon: Book,
  },
  {
    title: "Starter IA",
    desc: "Basic AI for summarizing, tagging, and searching.",
    color: "#e45015",
    icon: Bot,
  },
  {
    title: "Community Support",
    desc: "Access the community for help and advice.",
    color: "#28c76f",
    icon: Users,
  },
];

export const MODULES_INDIVIDUAL: Module[] = [
  ...MODULES_STUDENT,
  {
    title: "Extended storage",
    desc: "20 GB of space for your notes and documents.",
    color: "#5554dc",
    icon: Briefcase,
  },
];

export const MODULES_PROFESSIONAL: Module[] = [
  ...MODULES_INDIVIDUAL,
  {
    title: "Advanced AI",
    desc: "More powerful AI to process larger volumes of data.",
    color: "#ff7f4d",
    icon: Cpu,
  },
  {
    title: "Priority Support",
    desc: "Access dedicated customer support.",
    color: "#28c76f",
    icon: Headphones,
  },
  {
    title: "On-demand modules",
    desc: "Add extensions (calendar, kanban, etc.).",
    color: "#3232d0",
    icon: Briefcase,
  },
];

export const MODULES_COMPANIES: Module[] = [
  ...MODULES_PROFESSIONAL,
  {
    title: "Collaboration",
    desc: "Work together on your notes and projects.",
    color: "#5554dc",
    icon: Users,
  },
  {
    title: "Rapports & Analytics",
    desc: "Dashboards and usage statistics.",
    color: "#ffb400",
    icon: Cpu,
  },
  {
    title: "Intégrations API & SSO",
    desc: "Connect Krypt to your existing tools.",
    color: "#00b0cf",
    icon: Briefcase,
  },
];

export const ALL_MODULES: Module[] = [
  {
    title: "Notes",
    desc: "Quick and easy note-taking with synchronization.",
    color: "#6366F1",
    icon: Book,
    category: "Notes",
  },
  {
    title: "Starter IA",
    desc: "Basic AI for summarizing, tagging, and searching.",
    color: "#EC4899",
    icon: Bot,
    category: "AI",
  },
  {
    title: "Community Support",
    desc: "Access the community for help and advice.",
    color: "#10B981",
    icon: Users,
    category: "Collaboration",
  },
  {
    title: "Extended storage",
    desc: "20 GB of space for your notes and documents.",
    color: "#F59E0B",
    icon: Briefcase,
    category: "Storage",
  },
  {
    title: "Advanced AI",
    desc: "More powerful AI to process larger volumes of data.",
    color: "#8B5CF6",
    icon: Cpu,
    category: "AI",
  },
  {
    title: "Support Prioritaire",
    desc: "Access dedicated customer support.",
    color: "#EF4444",
    icon: Headphones,
    category: "Collaboration",
  },
  {
    title: "Priority Support",
    desc: "Add extensions (calendar, kanban, etc.).",
    color: "#14B8A6",
    icon: Layout,
    category: "Other",
  },
  {
    title: "Collaboration",
    desc: "Work together on your notes and projects.",
    color: "#0EA5E9",
    icon: Share2,
    category: "Collaboration",
  },
  {
    title: "Reports & Analytics",
    desc: "Dashboards and usage statistics.",
    color: "#F97316",
    icon: BarChart,
    category: "Analytics",
  },
  {
    title: "API & SSO Integrations",
    desc: "Connect Krypt to your existing tools.",
    color: "#22C55E",
    icon: Code,
    category: "Integrations",
  },
  {
    title: "Calendar",
    desc: "Schedule your tasks and meetings with an integrated calendar.",
    color: "#3B82F6",
    icon: Calendar,
    category: "Other",
  },
  {
    title: "Kanban",
    desc: "Organize your projects with visual boards.",
    color: "#EAB308",
    icon: Layout,
    category: "Other",
  },
  {
    title: "Notifications",
    desc: "Receive personalized reminders and alerts.",
    color: "#F43F5E",
    icon: Bell,
    category: "Other",
  },
  {
    title: "Cloud Backup",
    desc: "Automatic backup of your data to the cloud.",
    color: "#0EA5E9",
    icon: Cloud,
    category: "Storage",
  },
  {
    title: "Advanced Security",
    desc: "Multi-factor authentication and enhanced encryption.",
    color: "#10B981",
    icon: Shield,
    category: "Other",
  },
  {
    title: "Translation",
    desc: "Automatic translation of your notes into multiple languages.",
    color: "#6366F1",
    icon: Globe,
    category: "AI",
  },
  {
    title: "Documents",
    desc: "Store and manage your files and PDFs directly.",
    color: "#6D28D9",
    icon: FileText,
    category: "Storage",
  },
  {
    title: "Collaborative chat",
    desc: "Chat with your coworkers in real time.",
    color: "#DB2777",
    icon: MessageSquare,
    category: "Collaboration",
  },
  {
    title: "File management",
    desc: "Organize your notes and projects into folders.",
    color: "#1D4ED8",
    icon: FolderOpen,
    category: "Storage",
  },
  {
    title: "Automation",
    desc: "Create automatic workflows with rules.",
    color: "#E11D48",
    icon: Zap,
    category: "Other",
  },
];
