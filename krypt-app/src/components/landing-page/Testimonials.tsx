import Image from "next/image";
import { Quote } from "lucide-react";
import TestimonialImg from "@/app/favicon.png";
import { TESTIMONIAL } from "@/lib/constants";

export default function Testimonial() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            <div className="relative inline-flex">
              <Quote className="absolute -left-6 -top-2 h-8 w-8 text-gray-300" />
              <Image
                className="rounded-full"
                src={TestimonialImg}
                width={48}
                height={48}
                alt="MindVault testimonial"
              />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {TESTIMONIAL.quote}
              <em className="italic text-gray-500">{TESTIMONIAL.emphasized}</em>
              ”
            </p>
            <div className="text-sm font-medium text-gray-500">
              <span className="text-gray-700">{TESTIMONIAL.author}</span>{" "}
              <span className="text-gray-400">/</span>{" "}
              <span className="text-blue-500">{TESTIMONIAL.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
