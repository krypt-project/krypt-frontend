"use client";

import { FC } from "react";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button/Button";

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  step: number;
  setStep: (step: number) => void;
}

const BillingModal: FC<BillingModalProps> = ({
  isOpen,
  onClose,
  planName,
  step,
  setStep,
}) => {
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            You selected the <strong>{planName}</strong> plan.
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Expiry Date"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="CVC"
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
      case 4:
        return (
          <div>
            Confirmation ! Thank you for subscribing to{" "}
            <strong>{planName}</strong>.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={planName} variant="billing">
      {renderStep()}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button variant="gradient" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button variant="gradient" onClick={onClose}>
            Finish
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default BillingModal;
