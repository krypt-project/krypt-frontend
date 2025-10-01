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

      <div className="flex flex-1 justify-center w-full bg-[var(--secondary)] p-3">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-25 mb-10 auto-rows-[200px]">
          {filteredModules.map((m, idx) => (
            <FeatureCard key={idx} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
