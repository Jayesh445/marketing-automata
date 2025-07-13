import { HeroSection } from "@/src/components/landing/HeroSection";
import { FeaturesSection } from "@/src/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/src/components/landing/TestimonialsSection";
import { CTASection } from "@/src/components/landing/CTASection";
import { LandingNavbar } from "@/src/components/landing/LandingNavbar";
import { Footer } from "@/src/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
