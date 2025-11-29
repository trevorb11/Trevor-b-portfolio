import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import MarketingIntegrationSection from "@/components/MarketingIntegrationSection";
import AIExpertiseSection from "@/components/AIExpertiseSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import AuroraDivider from "@/components/AuroraDivider";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location, setLocation] = useLocation();
  
  // Handle hash links for direct navigation to sections
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Remove the # symbol to get just the id
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a slight delay to ensure the page is fully loaded
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
      // Scroll to top if no hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="bg-[var(--c-bg)]">
      <HeroSection />
      <AuroraDivider />
      <AboutSection />
      <AuroraDivider />
      <MarketingIntegrationSection />
      <AuroraDivider />
      <AIExpertiseSection />
      <AuroraDivider />
      <ProjectsSection />
      <AuroraDivider />
      <BlogSection />
      <AuroraDivider />
      <CaseStudiesSection />
      <AuroraDivider />
      <ContactSection />
    </main>
  );
};

export default Home;
