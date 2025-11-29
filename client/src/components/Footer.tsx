import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would send the email to the server
    toast({
      title: "Nicely done! 📫",
      description: "Your inbox just got a bit more interesting.",
    });
    
    setEmail("");
  };

  return (
    <footer className="relative text-white py-16">
      {/* Background sunset gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(to bottom, #D45A45 0%, #1E567C 100%)",
          filter: "blur(40px)"
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-8">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-4 inline-block">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--c-hi)] to-[var(--c-fx)] flex items-center justify-center">
                <span className="text-black font-bold text-lg">TB</span>
              </div>
              <div className="text-xl font-bold">
                <span className="text-[var(--c-hi)]">Trevor</span>
                <span className="text-white">Bosetti</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Your go-to resource for marketing technology insights, creative AI applications, and bridging the gap between marketing objectives and technical implementation.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[var(--c-hi)] transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[var(--c-hi)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[var(--c-hi)] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@example.com" className="text-white/70 hover:text-[var(--c-hi)] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[var(--c-hi)] font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-[var(--c-hi)] transition-colors inline-flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-white/70 hover:text-[var(--c-hi)] transition-colors inline-flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" /> About
                </Link>
              </li>
              <li>
                <Link href="/#integrations" className="text-white/70 hover:text-[var(--c-hi)] transition-colors inline-flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" /> Integrations
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-white/70 hover:text-[var(--c-hi)] transition-colors inline-flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" /> Projects
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="text-white/70 hover:text-[var(--c-hi)] transition-colors inline-flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" /> Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[var(--c-hi)] font-semibold mb-4 text-lg">Stay Updated</h4>
            <p className="text-white/70 mb-4">
              Get fresh MarTech insights straight to your inbox. No fluff, just useful stuff.
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-full text-white placeholder:text-white/30 focus-visible:ring-[var(--c-hi)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                className="bg-[var(--c-hi)] hover:bg-[var(--c-hi)]/90 text-black font-medium rounded-r-full rounded-l-none"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Trevor Bosetti. Turning data into stories that stick.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
