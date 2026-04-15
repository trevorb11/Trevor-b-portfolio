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
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
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
