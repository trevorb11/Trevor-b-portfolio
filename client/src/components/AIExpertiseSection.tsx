import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, BrainCircuit, Zap, Sparkles,
  ChevronLeft, ChevronRight, ChevronDown,
  Users, GitBranch, ArrowRight, ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PersonalizationSection from "./PersonalizationSection";
import WorkflowDemoSection from "./WorkflowDemoSection";
import LiveTerminal from "./LiveTerminal";

const AIExpertiseSection = () => {
  const [activeApp, setActiveApp] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const { data: cmsContents } = useQuery<CmsContent[]>({ queryKey: ["/api/cms"] });

  const aiContent = React.useMemo(() => {
    if (!cmsContents) return {};
    return cmsContents
      .filter(c => c.section === "ai")
      .reduce((acc, c) => { acc[c.key] = c.value; return acc; }, {} as Record<string, string>);
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
      description: "Giving every person a unique experience no longer requires a massive team. Now it's a design and data problem, and AI makes it scalable.",
      mobileIntro: "Giving every person a unique experience no longer requires a massive team. It's a design and data problem, and these tools make it achievable.",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "Hyper custom conversion channels",
      description: "AI-powered conversations that branch across 96+ decision paths, qualifying each lead with language tailored to their responses. Not a generic chatbot, but a structured funnel that adapts.",
      mobileIntro: "AI-powered conversations that branch across dozens of decision paths, qualifying each lead with language tailored to their specific responses.",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI as a Thought Partner",
      description: "Pressure-test your strategy by assembling a council of distinct AI personas, each bringing different perspectives and surfacing blind spots.",
      mobileIntro: "Assembling a council of distinct AI personas lets you pressure-test strategy from multiple angles at once.",
      icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI as an orchestrator",
      description: "AI can manage sequences, trigger workflows, sync data across platforms, and generate reports without you touching each system individually.",
      mobileIntro: "AI can manage sequences, trigger workflows, and sync data across platforms without you touching each system manually.",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI for Fun Creative",
      description: "AI as the engine behind engaging experiences. Generate branded trivia and interactive content that feels handcrafted but scales instantly.",
      mobileIntro: "Branded trivia and interactive content that feels handcrafted but scales as fast as you need it to.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
  ];

  const councilCard = (
    <div className="px-4 pb-8">
      <Link href="/council-of-ideas">
        <div
          className="group relative overflow-hidden rounded-2xl p-7 cursor-pointer border border-primary/20 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
          style={{ background: "linear-gradient(135deg, hsl(16 78% 55% / 0.12), hsl(28 83% 62% / 0.08))" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none" />
          <div className="relative flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">The Council of Ideas</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                What happens when you assemble history's sharpest minds to pressure-test a real business decision? A live demonstration of using multi-persona AI for structured perspective and clearer thinking.
              </p>
              <Button asChild className="group/btn rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-5 h-9 text-sm">
                <span>
                  Enter the Council
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  const triviaCard = (
    <div className="px-4 pb-8">
      <div className="premium-card relative overflow-hidden p-7">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] pointer-events-none" />
        <div className="relative flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">AI Trivia Generator</h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Generate customized, industry-specific trivia games on demand. Input your topic, audience, and tone, and AI builds a fully branded quiz experience your team refines rather than builds from scratch.
            </p>
            <Button asChild className="group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-5 h-9 text-sm">
              <a href="https://trivia-forge.replit.app/" target="_blank" rel="noopener noreferrer">
                Try the Generator
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop right-column demos
  const desktopDemos = [
    <PersonalizationSection key="d-p" />,
    <WorkflowDemoSection key="d-w" />,
    <div key="d-c" className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">{councilCard}</div>
    </div>,
    <LiveTerminal key="d-t" />,
    <div key="d-tr" className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">{triviaCard}</div>
    </div>,
  ];

  // Mobile accordion demos (same content, rendered when expanded)
  const mobileDemos = [
    <PersonalizationSection key="m-p" />,
    <WorkflowDemoSection key="m-w" />,
    councilCard,
    <LiveTerminal key="m-t" />,
    triviaCard,
  ];

  const toggleAccordion = (i: number) =>
    setOpenAccordion(prev => (prev === i ? null : i));

  return (
    <section id="ai-expertise" className="py-20 md:py-28 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5">
            <BrainCircuit size={20} />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {aiContent.title || "AI as a force multiplier"}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl text-sm md:text-base">
            {aiContent.subtitle || "We\u2019re at an inflection point. AI is going to reshape the digital landscape at a scale we\u2019re still underestimating, and the teams that lean in now will shape what comes next."}
          </motion.p>
        </motion.div>

        {/* Intro blurb */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-3">
            <Cpu className="text-primary" size={16} />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">AI as a Competitive Advantage</span>
          </motion.div>
          <motion.div variants={itemVariants} className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-3">
            {(aiContent.advantage || "In today\u2019s rapidly evolving technological landscape, proficiency in AI isn\u2019t optional, it\u2019s essential. Learning how to leverage AI is the most valuable skill not just for the future, but today. Organizations that effectively leverage AI gain significant advantages in efficiency, capability, personalization, and market insights.\n\nIt\u2019s not hyperbole to say that learning how to use these tools is like equipping yourself with knowledge and creation superpowers.")
              .split("\n\n")
              .map((para, i) => <p key={i}>{para}</p>)}
          </motion.div>
        </motion.div>
      </div>

      {/* ── DESKTOP: sticky carousel left, demo right ── */}
      <div className="hidden lg:block border-t border-white/[0.06]">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[2fr_3fr] items-start">

            {/* Left: sticky carousel */}
            <div className="lg:sticky lg:top-24 py-14 lg:pr-10 lg:border-r border-white/[0.06]">
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

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeApp}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4 min-h-[110px]"
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
                        onClick={() => setActiveApp(p => (p - 1 + aiApplications.length) % aiApplications.length)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setActiveApp(p => (p + 1) % aiApplications.length)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                        aria-label="Next"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground/50 mt-3">
                  {activeApp + 1} / {aiApplications.length}
                </p>
              </motion.div>
            </div>

            {/* Right: demo panel */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {desktopDemos[activeApp]}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE: accordion ── */}
      <div className="lg:hidden border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {aiApplications.map((app, i) => {
            const isOpen = openAccordion === i;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border-b border-white/[0.06]"
              >
                {/* Accordion header — always visible */}
                <button
                  onClick={() => toggleAccordion(i)}
                  className="w-full flex items-center gap-3 px-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 transition-colors duration-200 ${isOpen ? "bg-primary/20" : "bg-primary/10"}`}>
                    {app.icon}
                  </div>
                  <span className={`flex-1 font-semibold text-sm transition-colors duration-200 ${isOpen ? "text-foreground" : "text-foreground/80"}`}>
                    {app.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`h-4 w-4 transition-colors duration-200 ${isOpen ? "text-primary" : "text-muted-foreground/50"}`} />
                  </motion.div>
                </button>

                {/* Accordion body — slides open */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      {/* Short intro */}
                      <p className="px-4 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {app.mobileIntro}
                      </p>
                      {/* Full demo */}
                      {mobileDemos[i]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AIExpertiseSection;
