import { HERO_CONTENT } from "@/lib/constants";

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
                <button className="group cursor-pointer inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-[#D56434] to-[#6D66E7] px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 sm:w-auto">
                  {HERO_CONTENT.primaryCta}
                </button>
                <button className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-800 px-6 py-3 text-sm font-medium text-gray-800 transition-colors duration-150 hover:bg-gray-100">
                  {HERO_CONTENT.secondaryCta}
                </button>
              </div>
            </div>
          </div>

          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="aspect-video rounded-2xl bg-gray-100 shadow-xl flex items-center justify-center text-gray-400 text-lg font-mono">
              {HERO_CONTENT.placeholder}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
