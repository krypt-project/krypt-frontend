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

      <div className="flex flex-1 w-full bg-[var(--secondary)] p-3">
        <div
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-22 ml-4 mr-4 mb-10 auto-rows-[200px]"
        >
          {filteredModules.map((m, idx) => (
            <FeatureCard key={idx} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
