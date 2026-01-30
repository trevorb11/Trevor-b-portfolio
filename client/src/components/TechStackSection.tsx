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
    <section id="tech-stack" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            What I bring to the table
          </h2>

          <p className="mb-10 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            <span className="text-foreground font-medium">8+ years</span> turning marketing ideas into technical reality. 
            I build systems that <span className="text-foreground font-medium">your team can actually maintain</span>—not 
            just impressive tech stacks, but tools that empower.
          </p>

          <div className="mb-10">
            <h4 className="text-xl font-semibold mb-6 text-primary">
              Tech I Work With
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="px-4 py-2 bg-card/50 border border-border/50 rounded-full text-sm font-medium text-foreground/80 hover:bg-primary/20 hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-medium shadow-lg"
          >
            <Link href="#contact">
              Let's build something great
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
