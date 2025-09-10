"use client";

import clsx from "clsx";
import { Check, ArrowRight } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Register" },
  { id: 2, label: "Verify Email" },
  { id: 3, label: "Choose Your Plan" },
  { id: 4, label: "Billing" },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex justify-center gap-4 w-full max-w-4xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div
              className={clsx(
                "p-3 border rounded-lg w-full flex items-center justify-between transition-colors",
                {
                  "bg-[var(--success)]/15 border-[var(--success)]/30 text-[var(--success)]": isCompleted,
                  "bg-[var(--primary)]/15 border-[var(--primary)]/30 text-[var(--primary)]": isActive,
                  "bg-[var(--background)] border-[var(--border)] text-gray-600":
                    !isCompleted && !isActive,
                }
              )}
            >
              <h3 className="font-medium text-sm">
                {step.id}. {step.label}
              </h3>
              {isCompleted && <Check className="w-4 h-4" />}
              {isActive && <ArrowRight className="w-4 h-4" />}
            </div>

            {index < steps.length - 1 && (
              <div
                className={clsx("h-1 bg-[var(--border)] w-full mt-2 rounded", {
                  "bg-[var(--success)]/80": currentStep > step.id,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
