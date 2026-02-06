import { motion } from "framer-motion";
import { Zap, Anchor, Code, BarChart } from "lucide-react";
import SectionHeading from "./SectionHeading";

const skills = [
  {
    icon: Zap,
    title: "System Orchestrator",
    description: "I specialize in making marketing systems work together harmoniously, even when they weren't designed to.",
    color: "primary" as const,
  },
  {
    icon: Anchor,
    title: "Business Anchor",
    description: "I keep technical projects firmly rooted in business goals, making sure they deliver real, measurable value.",
    color: "accent" as const,
  },
  {
    icon: Code,
    title: "Tech Translator",
    description: "I speak both marketing and tech fluently, bridging communication gaps between teams.",
    color: "primary" as const,
  },
  {
    icon: BarChart,
    title: "Data Storyteller",
    description: "I turn raw metrics into compelling narratives that engage stakeholders and drive decision-making.",
    color: "accent" as const,
  },
];

const WhatIBringSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        <SectionHeading
          title="Making the most out of digital tools"
          subtitle="Building connections, systems, and stories that turn puzzle pieces into engaging, personable ecosystems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
          {/* Skills Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const isAccent = skill.color === "accent";
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="premium-card p-5 flex gap-4 items-start"
                >
                  <div className={`${isAccent ? "bg-accent/10" : "bg-primary/10"} p-2.5 rounded-xl flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${isAccent ? "text-accent" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1 text-foreground">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Puzzle Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-60 pointer-events-none"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30">
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
