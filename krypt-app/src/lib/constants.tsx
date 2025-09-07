{
  /* Hero Section Content */
}
export const HERO_CONTENT = {
  title: "Your ideas, connected and organized",
  description:
    "Mindvault is your intelligent knowledge base - capture, link, and resurface insights effortlessly. Built for thinkers, creators, and lifelong learners.",
  primaryCta: "Try Mindvault Free",
  secondaryCta: "Learn More",
  placeholder: "[ Product image here ]",
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
    "“MindVault m'aide à capturer mes idées, à structurer ma pensée, et à revenir facilement sur ce qui compte. ",
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
    links: ["About Mindvault", "Careers", "Privacy & Terms", "Contact"],
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
    alt: "Mindvault Logo",
    text: `© ${new Date().getFullYear()} Mindvault - All rights reserved.`,
  },
};
