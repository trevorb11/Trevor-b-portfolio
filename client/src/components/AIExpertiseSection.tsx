import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, BrainCircuit, TrendingUp, Zap, Sparkles, ChevronLeft, ChevronRight, Users, GitBranch, ArrowRight, ExternalLink, Bot, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PersonalizationSection from "./PersonalizationSection";
import WorkflowDemoSection from "./WorkflowDemoSection";
import LiveTerminal from "./LiveTerminal";

const AIExpertiseSection = () => {
  const [activeApp, setActiveApp] = useState(0);
  const { data: cmsContents } = useQuery<CmsContent[]>({
    queryKey: ["/api/cms"],
  });

  const aiContent = React.useMemo(() => {
    if (!cmsContents) return {};
    return cmsContents
      .filter(content => content.section === "ai")
      .reduce((acc, content) => {
        acc[content.key] = content.value;
        return acc;
      }, {} as Record<string, string>);
  }, [cmsContents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const aiApplications = [
    {
      title: "Personalization at scale",
      description: "Giving every person a unique, data-driven experience used to require a massive team. Now it's a design and data problem. AI makes individual feel scalable.",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "Hyper custom conversion channels",
      description: "AI-powered conversations that branch across 96+ decision paths, qualifying each lead with language tailored to their responses. Not a generic chatbot — a structured funnel that adapts.",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI as a Thought Partner",
      description: "Pressure-test your strategy by assembling a council of distinct AI personas — each bringing different perspectives, challenging assumptions, and surfacing angles you hadn't considered.",
      icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI as an orchestrator",
      description: "AI doesn't just answer questions — it can manage sequences, trigger workflows, sync data across platforms, and generate reports without you touching each system individually.",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI for Fun Creative",
      description: "AI as the engine behind engaging experiences. Generate branded trivia, creative campaigns, and interactive content that feels handcrafted but scales instantly.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
  ];

  const demos = [
    <PersonalizationSection key="personalization" />,
    <WorkflowDemoSection key="workflow" />,
    <div key="council" className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/council-of-ideas">
          <div className="group relative overflow-hidden rounded-2xl p-8 md:p-12 cursor-pointer border border-primary/20 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            style={{ background: "linear-gradient(135deg, hsl(16 78% 55% / 0.12), hsl(28 83% 62% / 0.08))" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BrainCircuit className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">The Council of Ideas</h3>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
                  What happens when you assemble history's sharpest minds — Darwin, Socrates, Feynman — to pressure-test a real business decision? A live demonstration of using multi-persona AI for structured perspective and clearer thinking.
                </p>
                <Button asChild className="group/btn rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-6 h-10">
                  <span>
                    Enter the Council
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>,
    <LiveTerminal key="terminal" />,
    <div key="trivia" className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="premium-card relative overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">AI Trivia Generator</h3>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
                Generate customized, industry-specific trivia games on demand. Input your topic, audience, and tone — AI builds a fully branded quiz experience your team refines rather than builds from scratch.
              </p>
              <Button asChild className="group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-6 h-10">
                <a href="https://trivia-forge.replit.app/" target="_blank" rel="noopener noreferrer">
                  Try the Generator
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <section id="ai-expertise" className="py-20 md:py-28 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-14"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5">
            <BrainCircuit size={20} />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {aiContent.title || "AI as a force multiplier"}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl text-sm md:text-base">
            {aiContent.subtitle || "We\u2019re at an inflection point. AI is going to reshape the digital landscape at a scale we\u2019re still underestimating \u2014 and the teams that lean in now will shape what comes next."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-3 flex items-center text-foreground">
                <Cpu className="mr-2.5 text-primary" size={18} />
                AI as a Competitive Advantage
              </h3>
              <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-3">
                {(aiContent.advantage || "In today\u2019s rapidly evolving technological landscape, proficiency in AI isn\u2019t optional, it\u2019s essential. Learning how to leverage AI is the most valuable skill not just for the future, but today. Organizations that effectively leverage AI gain significant advantages in efficiency, capability, personalization, and market insights.\n\nIt\u2019s not hyperbole to say that learning how to use these tools is like equipping yourself with knowledge and creation superpowers.")
                  .split("\n\n")
                  .map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-3 flex items-center text-foreground">
                <TrendingUp className="mr-2.5 text-primary" size={18} />
                Strategic AI Implementation
              </h3>
              <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-3">
                {(aiContent.strategy || "My approach focuses on implementation that aligns with your business objectives. Rather than adopting AI for its own sake, I help organizations identify specific areas where AI can solve real problems and drive measurable results. However on a base level, I implore everyone to familiarize yourself with these tools in whatever way possible.")
                  .split("\n\n")
                  .map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="premium-card p-7">
              <motion.div variants={itemVariants} className="mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="text-primary" size={16} />
                  <span className="text-lg font-bold">Novel Use Cases</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Everyone knows AI can draft emails or create images. Here are some more practical and novel applications.
                </p>
              </motion.div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeApp}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 min-h-[100px]"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
                      {aiApplications[activeApp].icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1.5 text-foreground">
                        {aiApplications[activeApp].title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {aiApplications[activeApp].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex gap-1.5">
                    {aiApplications.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveApp(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeApp ? "w-5 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/35"
                        }`}
                        aria-label={`Go to ${aiApplications[i].title}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveApp((prev) => (prev - 1 + aiApplications.length) % aiApplications.length)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActiveApp((prev) => (prev + 1) % aiApplications.length)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Demo area — synced to carousel */}
      <div className="mt-8 border-t border-white/[0.04]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeApp}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            {demos[activeApp]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIExpertiseSection;
