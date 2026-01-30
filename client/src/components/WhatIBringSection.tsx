import { motion } from "framer-motion";
import { Zap, Anchor, Code, BarChart } from "lucide-react";
import SectionHeading from "./SectionHeading";

const WhatIBringSection = () => {
  return (
    <section id="about" className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="Making the most out of digital tools and resources"
          subtitle="Building connections, systems, and stories that turn puzzle pieces into engaging, personable ecosystems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
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

          {/* Puzzle Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-border/50 shadow-2xl">
              <img
                src="/puzzle-image.png"
                alt="Digital puzzle pieces connecting together"
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIBringSection;
