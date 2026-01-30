import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Anchor, Code, BarChart } from "lucide-react";

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

const WhatIBringSection = () => {
  return (
    <section id="skills" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Skills Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/10 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent/10 blur-xl"></div>

            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 relative z-10 shadow-xl">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      System Orchestrator
                    </h3>
                    <p className="text-muted-foreground">
                      I specialize in making marketing systems work together
                      harmoniously, even when they weren't designed to.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Anchor className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      Business Anchor
                    </h3>
                    <p className="text-muted-foreground">
                      I keep technical projects firmly rooted in business goals,
                      making sure they deliver real, measurable value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      Tech Translator
                    </h3>
                    <p className="text-muted-foreground">
                      I speak both marketing and tech fluently, bridging
                      communication gaps between teams.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <BarChart className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      Data Storyteller
                    </h3>
                    <p className="text-muted-foreground">
                      I turn raw metrics into compelling narratives that engage
                      stakeholders and drive decision-making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What I Bring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              What I bring to the table
            </h3>

            <p className="mb-8 text-muted-foreground text-lg leading-relaxed">
              <span className="text-foreground font-medium">8+ years</span> turning marketing dreams into technical reality. 
              I build systems that <span className="text-foreground font-medium">your team can actually maintain</span>—not 
              just impressive tech stacks, but tools that empower.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-primary">
                Tech I Work With
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-card/50 border border-border/50 rounded-full text-sm font-medium text-foreground/80 hover:bg-primary/20 hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
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
      </div>
    </section>
  );
};

export default WhatIBringSection;
