import Image from "next/image";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import PlanetImg from "@/app/favicon.png";
import { FEATURES_HEADER, FEATURES_LIST } from "@/config/constants";

export default function Features() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {FEATURES_HEADER.title}
            </h2>
          </div>

          {/* Planet */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[1.25] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-gradient-to-b before:from-[var(--background-2)] before:to-[var(--primary)] before:blur-3xl before:rounded-full">
                <Image
                  className="rounded-full"
                  src={PlanetImg}
                  width={400}
                  height={400}
                  alt="Planet"
                />
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES_LIST.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
