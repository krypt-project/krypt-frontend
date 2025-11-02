import Image from "next/image";
import { Quote } from "lucide-react";
import TestimonialImg from "@/app/favicon.png";
import { TESTIMONIAL } from "@/config/constants";

export default function Testimonial() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            <div className="relative inline-flex">
              <Quote className="absolute -left-6 -top-2 h-8 w-8 text-[var(--primary)]" />
              <Image
                className="rounded-full"
                src={TestimonialImg}
                width={48}
                height={48}
                alt="Krypt testimonial"
              />
            </div>
            <p className="text-2xl font-bold text-[var(--text-dark)]">
              {TESTIMONIAL.quote}
              <em className="italic text-[var(--text-secondary)]">{TESTIMONIAL.emphasized}</em>
              ”
            </p>
            <div className="text-sm font-medium text-[var(--text-secondary)]">
              <span className="text-[var(--text-secondary)]">{TESTIMONIAL.author}</span>{" "}
              <span className="text-[var(--text-secondary)]">/</span>{" "}
              <span className="text-[var(--primary)]">{TESTIMONIAL.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
