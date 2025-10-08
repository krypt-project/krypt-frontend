"use client";

import { useEffect, useState } from "react";
import { ALL_MODULES, Module } from "@/config/constants";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import MarketplaceNavbar from "./components/MarketplaceNavbar";
import { toast } from "react-hot-toast";

export default function Marketplace() {
  const [filter, setFilter] = useState<Module["category"] | "All">("All");

  useEffect(() => {
    const hasShownToast = localStorage.getItem("hasShownMarketplaceToast");
    if (!hasShownToast) {
      toast(
        (t) => (
          <span>
            Bienvenue sur le Marketplace KRYPT. Découvrez les modules
            complémentaires disponibles pour étendre les fonctionnalités de
            votre plateforme.
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-2 px-2 py-1 rounded text-white bg-gray-500"
            >
              Fermer
            </button>
          </span>
        ),
        {
          duration: Infinity,
          style: {
            maxWidth: "500px",
            boxShadow: "0px 4px 6px rgba(255, 0, 0, 0.5)",
          },
        }
      );
      // Marque le toast comme affiché
      localStorage.setItem("hasShownMarketplaceToast", "true");
    }
  }, []);
  const filteredModules =
    filter === "All"
      ? ALL_MODULES
      : ALL_MODULES.filter((m) => m.category === filter);

  return (
    <>
      <MarketplaceNavbar filter={filter} setFilter={setFilter} />

      <div className="w-full bg-[var(--secondary)] p-6">
        <div className="mt-17 grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] w-full">
          {filteredModules.map((m, idx) => (
            <FeatureCard key={idx} {...m} />
          ))}
        </div>
      </div>
    </>
  );
}
