import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for transparent header effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      closeMenu();
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location === path;
    }
    return location.startsWith(path);
  };

  const navLinks = [
    { name: "Home", path: "/", id: "" },
    { name: "About", path: "/#about", id: "about" },
    { name: "Integrations", path: "/#integrations", id: "integrations" },
    { name: "AI Expertise", path: "/#ai-expertise", id: "ai-expertise" },
    { name: "Projects", path: "/#projects", id: "projects" },
    { name: "Blog", path: "/#blog", id: "blog" },
    { name: "AI Play", path: "/#fun-ai", id: "fun-ai" },
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-md bg-black/60 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--c-hi)] to-[var(--c-fx)] flex items-center justify-center">
              <span className="text-black font-bold text-lg">TB</span>
            </div>
            <div>
              <span className="text-[var(--c-hi)]">Trevor</span>
              <span className="text-white">Bosetti</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.id ? (
                    <a 
                      href={link.path} 
                      onClick={(e) => scrollToSection(link.id, e)}
                      className={`font-medium transition-colors text-white/80 hover:text-[var(--c-hi)] ${
                        isActive(link.path) ? "text-[var(--c-hi)]" : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      href={link.path} 
                      onClick={closeMenu}
                      className={`font-medium transition-colors text-white/80 hover:text-[var(--c-hi)] ${
                        isActive(link.path) ? "text-[var(--c-hi)]" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-black/80 backdrop-blur-md rounded-lg mt-2"
            >
              <ul className="space-y-2 p-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    {link.id ? (
                      <a
                        href={link.path}
                        onClick={(e) => scrollToSection(link.id, e)}
                        className={`block py-2 transition-colors text-white/80 hover:text-[var(--c-hi)] ${
                          isActive(link.path) ? "text-[var(--c-hi)]" : ""
                        }`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={closeMenu}
                        className={`block py-2 transition-colors text-white/80 hover:text-[var(--c-hi)] ${
                          isActive(link.path) ? "text-[var(--c-hi)]" : ""
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
