import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send the email to the server
    toast({
      title: "Nicely done!",
      description: "Your inbox just got a bit more interesting.",
    });

    setEmail("");
  };

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Projects", path: "/#projects" },
    { name: "Case Studies", path: "/#case-studies" },
    { name: "Blog", path: "/#blog" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <footer className="relative bg-card/50 border-t border-border/50 py-16">
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(16 78% 63% / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-4 inline-block">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">TB</span>
              </div>
              <div className="text-xl font-bold">
                <span className="text-primary">Trevor</span>
                <span className="text-foreground">Bosetti</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Your go-to resource for marketing technology insights, creative AI
              applications, and bridging the gap between marketing objectives and
              technical implementation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:info@example.com"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-primary font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-primary font-semibold mb-4 text-lg">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Get fresh MarTech insights straight to your inbox. No fluff, just
              useful stuff.
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-background/50 border-border rounded-l-full text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-r-full rounded-l-none"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-6 text-center text-muted-foreground text-sm">
          <p>
            &copy; {new Date().getFullYear()} Trevor Bosetti. Turning data into
            stories that stick.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
