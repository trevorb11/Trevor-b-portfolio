import HeroSection from "@/components/HeroSection";
import WhatIBringSection from "@/components/WhatIBringSection";
import TechStackSection from "@/components/TechStackSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import MarketingIntegrationSection from "@/components/MarketingIntegrationSection";
import AIExpertiseSection from "@/components/AIExpertiseSection";
import WorkflowDemoSection from "@/components/WorkflowDemoSection";
import LiveTerminal from "@/components/LiveTerminal";
import AuroraDivider from "@/components/AuroraDivider";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location] = useLocation();

  // Handle hash links for direct navigation to sections
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

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <HeroSection />
      <WhatIBringSection />
      <AuroraDivider />
      <TechStackSection />
      <FeaturedProjectsSection />
      <AuroraDivider />
      <MarketingIntegrationSection />
      <WorkflowDemoSection />
      <LiveTerminal />
      <AIExpertiseSection />
      <AuroraDivider />
      <ProjectsSection />
      <AuroraDivider />
      <ContactSection />
    </main>
  );
};

export default Home;
