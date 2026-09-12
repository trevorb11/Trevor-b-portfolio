import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import MarketingIntegrationSection from "@/components/MarketingIntegrationSection";
import AIExpertiseSection from "@/components/AIExpertiseSection";
import HumanitySection from "@/components/HumanitySection";
import AuroraDivider from "@/components/AuroraDivider";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(window.location.hash.slice(1));
      element?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  return (
    <main>
      <HeroSection />
      <AuroraDivider />
      <AboutSection />
      <AuroraDivider />
      <TechStackSection />
      <FeaturedProjectsSection />
      <AuroraDivider />
      <MarketingIntegrationSection />
      <AuroraDivider />
      <AIExpertiseSection />
      <AuroraDivider />
      <HumanitySection />
      <AuroraDivider />
      <ProjectsSection />
      <AuroraDivider />
      <ContactSection />
    </main>
  );
};

export default Home;
