import Button from "@/components/atoms/Button";
import Image from "next/image";
import icon from "@/app/favicon.png";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl backdrop-filter backdrop-blur-[20px] px-3 shadow-lg shadow-black/[0.03] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-[#cbd5e1] before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Logo */}
          <div className="flex flex-1 items-center">
            <Image
              src={icon}
              alt="Logo"
              width={32}
              height={32}
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
              rounded
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
