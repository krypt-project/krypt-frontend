"use client";

import { useState } from "react";
import { ALL_MODULES, Module } from "@/config/constants";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import MarketplaceNavbar from "./components/MarketplaceNavbar";

export default function Marketplace() {
  const [filter, setFilter] = useState<Module["category"] | "All">("All");

  const filteredModules =
    filter === "All"
      ? ALL_MODULES
      : ALL_MODULES.filter((m) => m.category === filter);

  return (
    <>
      <MarketplaceNavbar filter={filter} setFilter={setFilter} />

      <div className="w-full bg-[var(--secondary)] p-6">
        <div
          className="mt-17 grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] w-full"
        >
          {filteredModules.map((m, idx) => (
            <FeatureCard key={idx} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
