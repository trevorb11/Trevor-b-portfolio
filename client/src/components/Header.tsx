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
    { name: "Projects", path: "/#projects", id: "projects" },
    { name: "Case Studies", path: "/#case-studies", id: "case-studies" },
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/90 shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">TB</span>
            </div>
            <div>
              <span className="text-primary">Trevor</span>
              <span className="text-foreground">Bosetti</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.id ? (
                    <a
                      href={link.path}
                      onClick={(e) => scrollToSection(link.id, e)}
                      className={`font-medium transition-colors text-foreground/80 hover:text-primary ${
                        isActive(link.path) ? "text-primary" : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={closeMenu}
                      className={`font-medium transition-colors text-foreground/80 hover:text-primary ${
                        isActive(link.path) ? "text-primary" : ""
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
            className="lg:hidden text-foreground"
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
              className="lg:hidden overflow-hidden bg-card/95 backdrop-blur-md rounded-lg mt-2 border border-border/50"
            >
              <ul className="space-y-1 p-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    {link.id ? (
                      <a
                        href={link.path}
                        onClick={(e) => scrollToSection(link.id, e)}
                        className={`block py-2 px-3 rounded-md transition-colors text-foreground/80 hover:text-primary hover:bg-primary/10 ${
                          isActive(link.path) ? "text-primary bg-primary/10" : ""
                        }`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={closeMenu}
                        className={`block py-2 px-3 rounded-md transition-colors text-foreground/80 hover:text-primary hover:bg-primary/10 ${
                          isActive(link.path) ? "text-primary bg-primary/10" : ""
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
