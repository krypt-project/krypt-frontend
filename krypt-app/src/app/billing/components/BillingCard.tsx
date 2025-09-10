"use client";

import { FC } from "react";
import { Card } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

interface BillingCardProps {
  roleType: string;
  price: string | undefined;
  features?: string[];
  onSelect: () => void;
}

const BillingCard: FC<BillingCardProps> = ({
  roleType,
  price,
  features,
  onSelect,
}) => {
  return (
    <Card
      variant="pricing"
      title={roleType}
      price={price}
      features={features}
    >
      <Button variant="gradient" onClick={onSelect} className="w-full mt-auto justify-center">
        Select
      </Button>
    </Card>
  );
};

export default BillingCard;
