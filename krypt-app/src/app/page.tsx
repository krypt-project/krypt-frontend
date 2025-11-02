import Header from "@/app/landing/components/Header";
import Hero from "@/app/landing/components/Hero";
import Features from "@/app/landing/components/Features";
import Testimonials from "@/app/landing/components/Testimonials";
import CTA from "@/app/landing/components/CTA";
import Footer from "@/app/landing/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
