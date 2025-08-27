import { HERO_CONTENT } from "@/config/constants";
import Button from "@/components/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,#cbd5e1,transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              {HERO_CONTENT.title.split(", ").map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx === 0 && <br className="max-lg:hidden" />}
                </span>
              ))}
            </h1>

            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                {HERO_CONTENT.description}
              </p>

              <div
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                data-aos="zoom-y-out"
                data-aos-delay={450}
              >
                <Button variant="primary">{HERO_CONTENT.primaryCta}</Button>
                <Button variant="secondary">{HERO_CONTENT.secondaryCta}</Button>
              </div>
            </div>
          </div>

          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div
              className="mx-auto max-w-4xl"
              data-aos="zoom-y-out"
              data-aos-delay={600}
            >
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/demo_app.png"
                  alt="Hero illustration"
                  width={1280}
                  height={720}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
