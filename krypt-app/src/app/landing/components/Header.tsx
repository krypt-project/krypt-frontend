import Button from "@/components/atoms/Button";
import Image from "next/image";
import icon from "@/app/favicon.png";

export default function Header() {
  return (
    <>
      {/* Background gradient blur */}
      <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-4/5 z-0 pointer-events-none">
        <div className="h-256 w-512 rounded-full bg-gradient-to-r from-[var(--background-2)] to-[var(--primary)] blur-[150px] opacity-35"></div>
      </div>

      <header className="fixed top-2 z-30 w-full md:top-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/80 backdrop-blur-[20px] px-3 shadow-lg shadow-black/[0.03] border border-[#cbd5e1]">
            {/* Logo */}
            <div className="flex flex-1 items-center">
              <Image
                src={icon}
                alt="Krypt Logo"
                width={150}
                height={80}
                style={{ borderRadius: "0.5rem" }}
              />
            </div>

            {/* Navigation */}
            <div className="flex flex-1 items-center justify-end gap-3">
              <Button
                href="/login-register?mode=login"
                variant="outlined"
                size="sm"
              >
                Login
              </Button>
              <Button
                href="/login-register?mode=register"
                variant="gradient"
                size="sm"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
