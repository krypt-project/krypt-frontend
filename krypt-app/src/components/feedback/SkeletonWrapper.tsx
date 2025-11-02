"use client";

import { ReactNode } from "react";

export function SkeletonWrapper({
  loading,
  skeleton,
  children,
}: {
  loading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}) {
  if (loading) {
    return <>{skeleton}</>;
  }
  return <>{children}</>;
}
