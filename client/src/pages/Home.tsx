import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import MarketingIntegrationSection from "@/components/MarketingIntegrationSection";
import AIExpertiseSection from "@/components/AIExpertiseSection";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location, setLocation] = useLocation();
  
  // Handle hash links for direct navigation to sections
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Add a slight delay to ensure the page is fully loaded
        setTimeout(() => {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80,
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
    <main>
      <HeroSection />
      <AboutSection />
      <MarketingIntegrationSection />
      <AIExpertiseSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
};

export default Home;
