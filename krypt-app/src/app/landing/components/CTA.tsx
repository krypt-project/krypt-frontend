import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import image from "@/app/favicon.png";

export default function Cta() {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[#010409]"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-[var(--primary)] blur-3xl opacity-100" />
          </div>

          {/* Background Illustration */}
          <div
            className="absolute inset-0 -z-10 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative h-[400px] w-[400px] rounded-full opacity-30">
              <div className="absolute inset-0 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-[var(--background-2)] to-[var(--primary)] blur-3xl"></div>
              <Image
                src={image}
                alt="Background pattern"
                width={400}
                height={400}
                className="relative z-10 mx-auto rounded-full bg-transparent p-4 shadow-inner"
              />
            </div>
          </div>

          {/* CTA Content */}
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,#464646,transparent)1] py-4 text-3xl font-bold text-[#f5f5f5] md:mb-12 md:text-4xl">
              Ready to build your second brain ?
            </h2>

            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <Button
                href="/dashboard"
                variant="gradient"
                size="lg"
                rounded
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
