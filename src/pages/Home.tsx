// src/pages/Home.tsx

import HeroSection from "../components/pages/home/HeroSection";
import FeatureSection from "../components/pages/home/FeatureSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeatureSection />
      <div className="h-12 md:h-16" />
    </div>
  );
}
