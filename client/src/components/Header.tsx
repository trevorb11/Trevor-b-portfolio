import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">Trevor</span>
            <span className="text-dark">Bosetti</span>
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
                      className={`font-medium transition-colors ${
                        isActive(link.path) ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      href={link.path} 
                      onClick={closeMenu}
                      className={`font-medium transition-colors ${
                        isActive(link.path) ? "text-primary" : "hover:text-primary"
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
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.id ? (
                    <a
                      href={link.path}
                      onClick={(e) => scrollToSection(link.id, e)}
                      className={`block py-2 transition-colors ${
                        isActive(link.path) ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={closeMenu}
                      className={`block py-2 transition-colors ${
                        isActive(link.path) ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
