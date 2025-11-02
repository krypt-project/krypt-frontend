"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { ArrowLeft } from "lucide-react";
import BillingCard from "./components/BillingCard";
import BillingModal from "./components/BillingModal";
import { PLANS } from "@/config/constants";
import Stepper from "@/components/feedback/Stepper";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setStep(1);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background-2)]/10 to-[var(--primary)]/25 px-4">
      <Button
        href="/"
        variant="outlined"
        className="absolute top-4 left-4 z-10"
      >
        <ArrowLeft />
        Back to Home
      </Button>
      <div className="w-full absolute top-4 flex justify-center">
        <Stepper currentStep={3} />
      </div>
      <h1 className="text-4xl font-bold mb-12 text-center mt-4">
        Choose Your Plan
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl items-stretch">
        {PLANS.map((plan) => (
          <BillingCard
            key={plan.roleType}
            roleType={plan.roleType}
            price={plan.pricePerMonth ?? undefined}
            features={plan.features}
            onSelect={() => handleSelectPlan(plan.roleType)}
          />
        ))}
      </div>

      {selectedPlan && (
        <BillingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planName={selectedPlan}
          step={step}
          setStep={setStep}
        />
      )}
    </div>
  );
}
