"use client";

import { Module } from "@/config/constants";
import Button from "@/components/atoms/Button/Button";

type MarketplaceNavbarProps = {
  filter: Module["category"] | "All";
  setFilter: (filter: Module["category"] | "All") => void;
};

export default function MarketplaceNavbar({
  filter,
  setFilter,
}: MarketplaceNavbarProps) {
  const categories: (Module["category"] | "All")[] = [
    "All",
    "AI",
    "Storage",
    "Collaboration",
    "Analytics",
    "Integrations",
    "Notes",
    "Other",
  ];

  return (
    <div className="fixed z-10 w-full flex items-center gap-3 h-17 border-b border-[var(--border)] px-14 py-3 bg-[var(--background)]">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="outlined"
          onClick={() => setFilter(cat)}
          className={`px-4 py-2 rounded-md font-medium ${
            filter === cat
              ? "bg-[var(--primary)] text-[var(--text-light)]"
              : "bg-[var(--secondary)] text-[var(--text-dark)] hover:bg-[var(--border)]"
          }`}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
