import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      const offset = 80;
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
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 shadow-[0_1px_0_0_hsl(var(--border)/0.5),0_4px_20px_-4px_hsl(203_61%_10%/0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-2 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <img 
              src="/tb-logo.png" 
              alt="Trevor Bosetti Logo" 
              className="h-14 w-auto object-contain group-hover:brightness-110 transition-all -my-2"
            />
            <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-[#FCD34D] via-[#F472B6] to-[#A78BFA] bg-clip-text text-transparent">
              TrevorBosetti
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.id ? (
                  <a
                    href={link.path}
                    onClick={(e) => scrollToSection(link.id, e)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:text-foreground ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-foreground/60 hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.path}
                    onClick={closeMenu}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:text-foreground ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-foreground/60 hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="ml-2 pl-3 border-l border-border/50">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium px-5 h-9"
              >
                <a
                  href="/#contact"
                  onClick={(e) => scrollToSection("contact", e)}
                >
                  Hire Me
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground/70 hover:text-foreground h-9 w-9"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-card/95 backdrop-blur-xl rounded-xl mb-3 border border-white/[0.06] shadow-xl shadow-black/20">
                <ul className="space-y-0.5 p-2">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      {link.id ? (
                        <a
                          href={link.path}
                          onClick={(e) => scrollToSection(link.id, e)}
                          className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                            isActive(link.path)
                              ? "text-primary bg-primary/10"
                              : "text-foreground/70 hover:text-foreground hover:bg-white/[0.04]"
                          }`}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.path}
                          onClick={closeMenu}
                          className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                            isActive(link.path)
                              ? "text-primary bg-primary/10"
                              : "text-foreground/70 hover:text-foreground hover:bg-white/[0.04]"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
