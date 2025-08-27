import { FOOTER } from "@/config/constants";
import { FooterBranding } from "@/components/molecules/FooterBranding";
import { FooterSection } from "@/components/molecules/FooterSection";
import { FooterSocials } from "@/components/molecules/FooterSocials";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="text-sm text-gray-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${
            border ? "border-t border-white/10" : ""
          }`}
        >
          <FooterBranding
            text={FOOTER.copyright.text}
            alt={FOOTER.copyright.alt}
          />

          <FooterSection
            title={FOOTER.product.title}
            links={FOOTER.product.links}
          />
          <FooterSection
            title={FOOTER.company.title}
            links={FOOTER.company.links}
          />
          <FooterSection
            title={FOOTER.resources.title}
            links={FOOTER.resources.links}
          />

          <FooterSocials />
        </div>
      </div>

      {/* Glow + background */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute -mt-6 left-1/2 -translate-x-1/2 text-[256px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#D56434] via-[#6D66E7] to-[#00d5ff] opacity-10">
          Mindvault
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-2/3">
          <div className="h-256 w-512 rounded-full bg-gradient-to-br from-[#D56434] via-[#6D66E7] to-[#00d5ff] blur-[120px] opacity-40"></div>
        </div>
      </div>
    </footer>
  );
}
