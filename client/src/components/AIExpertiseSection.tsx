import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, BrainCircuit, TrendingUp, Zap, Layers, MessageSquare, ArrowRight, Sparkles, ChevronLeft, ChevronRight, ExternalLink, Users, GitBranch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import { Link } from "wouter";

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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const aiApplications = [
    {
      title: "Personalization at scale",
      description: "Giving every person a unique, data-driven experience used to require a massive team. Now it's a design and data problem. AI makes individual feel scalable.",
      icon: <Users className="h-5 w-5 text-primary" />,
      demo: {
        label: "See it live: Impact Wrapped",
        href: "https://iw-fy25.communityfoodshare.org/impact?data=VTJGc2RHVmtYMTlCV3duVWNraTN5MDFLY2JTQ2ZJNS8wNkpSWlR1eVlJZFZYdUE5clhjbk5nZUlxYUxlZUUyT2ZuMWVHRUNTRzdUUDlmcm1KMTVyYUtKMzJTNHRsQnNsMEw1amtQT1NzbDltTWRIOC9yVWpsSnZUWi9CQ1BySWFRSmRzSFlaa2hLL3JsUXJHV3pkQVVDTUxUb2l0NU5udGg1dEt6VUxzVTFJQ1VSZ3M5YnVETHFWdWlVejNWU0dlM09XRzFCS1owMmp6MHZRbHhSdDR6alQwUlMxcXN0aVBDS1B3V0RDSWMxWWJqRVUreFkzczR6YW5nMTc4eG9iUWtLbEpvTEZlWHE1YmhDSUNVYW5uL2FqTFhVWGxlY094alZpYURteHJTSnhHYUFVbFc5N3huaVMrN0thRE5QRGVzd2hHemhiWldiZndtb1NLYmpxMkdlVXRIUXJCWUdJN250NWRvUEsvYWE4PQ%3D%3D",
        external: true,
      },
    },
    {
      title: "Hyper custom conversion channels",
      description: "AI-powered conversations that branch across 96+ decision paths, qualifying each lead with language tailored to their responses. Not a generic chatbot — a structured funnel that adapts.",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
      demo: {
        label: "Try the Interactive Workflow Demo",
        href: "/workflow-demo",
        external: false,
      },
    },
    {
      title: "AI as a Thought Partner",
      description: "Pressure-test your strategy by assembling a council of distinct AI personas — each bringing different perspectives, challenging assumptions, and surfacing angles you hadn't considered.",
      icon: <BrainCircuit className="h-5 w-5 text-primary" />,
      demo: {
        label: "Try the Council of Ideas",
        href: "/council-of-ideas",
        external: false,
      },
    },
    {
      title: "AI as an orchestrator",
      description: "AI doesn't just answer questions — it can manage sequences, trigger workflows, sync data across platforms, and generate reports without you touching each system individually.",
      icon: <Cpu className="h-5 w-5 text-primary" />,
      demo: {
        label: "Watch it run live ↓",
        href: "#live-terminal",
        external: false,
      },
    },
    {
      title: "AI for Fun Creative",
      description: "AI as the engine behind engaging experiences. Generate branded trivia, creative campaigns, and interactive content that feels handcrafted but scales instantly.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      demo: {
        label: "Try the AI Trivia Generator",
        href: "https://trivia-forge.replit.app/",
        external: true,
      },
    },
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
            {aiContent.subtitle ||
              "We\u2019re at an inflection point. AI is going to reshape the digital landscape at a scale we\u2019re still underestimating \u2014 and the teams that lean in now will shape what comes next."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
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
                    className="flex flex-col gap-4 min-h-[140px]"
                  >
                    <div className="flex items-start gap-4">
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
                    </div>

                    {aiApplications[activeApp].demo && (() => {
                      const { href, label, external } = aiApplications[activeApp].demo;
                      const cls = "inline-flex items-center gap-2 text-xs font-medium text-primary/80 hover:text-primary border border-primary/20 hover:border-primary/40 bg-primary/[0.06] hover:bg-primary/[0.10] rounded-lg px-3.5 py-2.5 transition-all duration-200 self-start";
                      if (external) {
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {label} <ExternalLink className="h-3 w-3" />
                          </a>
                        );
                      }
                      if (href.startsWith("#")) {
                        return (
                          <a href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); }} className={cls}>
                            {label} <ArrowRight className="h-3 w-3" />
                          </a>
                        );
                      }
                      return (
                        <Link href={href}>
                          <span className={cls + " cursor-pointer"}>
                            {label} <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      );
                    })()}
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
    </section>
  );
};

export default AIExpertiseSection;
