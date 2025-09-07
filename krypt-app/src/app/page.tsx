import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";
import Testimonials from "@/components/landing-page/Testimonials";
import CTA from "@/components/landing-page/CTA";
import Footer from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
