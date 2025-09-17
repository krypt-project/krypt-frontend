"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";

export default function AccountVerifiedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background-2)]/10 to-[var(--primary)]/25 px-4">
      <Card variant="auth" className="max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--success)] mb-4">
          Account Verified !
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Your email address has been confirmed. You can now continue the
          registration process on the previous page.
        </p>

        <Button
          variant="gradient"
          onClick={() => {
            window.close();

            setTimeout(() => {
              if (!window.closed) router.push("/");
            }, 100);
          }}
        >
          Close this page
        </Button>
      </Card>
    </div>
  );
}
