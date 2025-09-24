"use client";

import { useEffect, useState } from "react";

export function FormattedDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    setFormatted(new Date(date).toLocaleString());
  }, [date]);

  return <>{formatted}</>;
}
