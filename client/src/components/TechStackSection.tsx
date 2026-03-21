import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const technologies = [
  "HubSpot",
  "Salesforce",
  "Mailchimp",
  "Blackbaud",
  "HTML",
  "Zapier",
  "Classy",
  "Make",
  "Google Analytics",
  "GTM",
  "Tableau",
  "Python",
  "Javascript",
  "OpenAI",
  "Anthropic",
  "Go High Level",
  "WordPress",
];

const TechStackSection = () => {
  // Duplicate the list so the second copy seamlessly follows the first
  const tickerItems = [...technologies, ...technologies];

  return (
    <section id="about" className="py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-sunset">
            What I bring to the table
          </h2>

          <p className="mb-12 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            <span className="text-foreground font-medium">8+ years</span> turning marketing ideas into systems with impact.
            I build systems that <span className="text-foreground font-medium">your team can use</span> to get the most out of your time, resources, and strategies.
          </p>
        </motion.div>
      </div>

      {/* Scrolling ticker - full bleed */}
      <div className="mb-14">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6 text-center">
          Tech I Work With
        </p>

        {/* Ticker container with fade masks on edges */}
        <div className="relative overflow-hidden ticker-mask">
          {/* Row 1 - scrolls left */}
          <div className="flex w-max animate-ticker">
            {tickerItems.map((tech, i) => (
              <span
                key={`a-${i}`}
                className="mx-2 shrink-0 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-foreground/70 whitespace-nowrap select-none"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Row 2 - scrolls right (reversed, slight delay feel) */}
          <div className="flex w-max animate-ticker-reverse mt-3">
            {[...tickerItems].reverse().map((tech, i) => (
              <span
                key={`b-${i}`}
                className="mx-2 shrink-0 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-foreground/70 whitespace-nowrap select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-8 h-12"
        >
          <Link href="#contact">
            Let's Build Something
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default TechStackSection;
