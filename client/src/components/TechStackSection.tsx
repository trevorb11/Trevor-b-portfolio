import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const technologies = [
  "HubSpot",
  "Salesforce",
  "Mailchimp",
  "Blackbaud",
  "Marketo",
  "Zapier",
  "Airtable",
  "Make",
  "Google Analytics",
  "GTM",
  "Tableau",
  "Python",
  "R",
  "OpenAI",
  "Anthropic",
];

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="py-24 md:py-32 px-4">
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
            <span className="text-foreground font-medium">8+ years</span> turning marketing ideas into technical reality.
            I build systems that <span className="text-foreground font-medium">your team can actually maintain</span> &mdash; not
            just impressive tech stacks, but tools that empower.
          </p>

          <div className="mb-12">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
              Tech I Work With
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-foreground/70 hover:bg-primary/10 hover:text-foreground hover:border-primary/20 transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-8 h-12"
          >
            <Link href="#contact">
              Let's build something great
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
