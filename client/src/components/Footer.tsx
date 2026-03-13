import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

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
    { name: "Contact", path: "/#contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/trevorb11", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/trevor-bosetti-9a291a126/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:trevor@rankzone.studio", label: "Email" },
  ];

  const integrationTools = [
    { name: "HubSpot", category: "CRM & Marketing" },
    { name: "Salesforce", category: "CRM" },
    { name: "Mailchimp", category: "Email Marketing" },
    { name: "Marketo", category: "Marketing Automation" },
    { name: "Google Analytics", category: "Analytics" },
    { name: "Zapier", category: "Integration Platform" },
    { name: "Segment", category: "Customer Data Platform" },
    { name: "ActiveCampaign", category: "Marketing Automation" },
  ];

  return (
    <footer className="relative border-t border-white/[0.04] py-16">
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">Platforms I Work With</p>
          <div className="flex flex-wrap gap-3">
            {integrationTools.map((tool, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm transition-all hover:border-primary/30 hover:bg-white/[0.05]"
              >
                <span className="font-medium text-foreground/90">{tool.name}</span>
                <span className="text-muted-foreground/50 ml-2 text-xs">{tool.category}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5 inline-block">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">TB</span>
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                Trevor<span className="text-primary">Bosetti</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground/70 mb-6 max-w-sm leading-relaxed">
              Your go-to resource for marketing technology insights, creative AI
              applications, and bridging the gap between marketing objectives and
              technical implementation.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.04] text-muted-foreground/60 hover:text-primary hover:border-primary/20 transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 mt-6">Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Stay Updated</p>
            <p className="text-sm text-muted-foreground/60 mb-4 leading-relaxed">
              Get fresh MarTech insights straight to your inbox. No fluff, just
              useful stuff.
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-l-full text-foreground text-sm placeholder:text-muted-foreground/40 focus-visible:ring-primary/20 focus-visible:border-primary/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-r-full rounded-l-none px-5"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 text-center space-y-1">
          <p className="text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} Trevor Bosetti. Turning data into
            stories that stick.
          </p>
          <p className="text-xs text-muted-foreground/30">
            Trevor Bosetti operates professionally through RankZone Studio. All inquiries and communications are managed by Trevor Bosetti.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
