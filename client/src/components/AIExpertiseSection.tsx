import React from "react";
import { motion } from "framer-motion";
import { Cpu, BrainCircuit, TrendingUp, Zap, Layers, Code, LineChart, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import { Link } from "wouter";

const AIExpertiseSection = () => {
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
      title: "Personalized outreach",
      description: "Turn a blank page into polished emails, proposals, and follow-ups in a fraction of the time.",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
    },
    {
      title: "Meeting and call summaries",
      description: "Pull clear takeaways, action items, and sentiment from long recordings and transcripts.",
      icon: <Layers className="h-5 w-5 text-primary" />,
    },
    {
      title: "Internal knowledge assistants",
      description: "Train a chatbot on your SOPs, documentation, and past projects so your team gets answers instantly.",
      icon: <Code className="h-5 w-5 text-primary" />,
    },
    {
      title: "Research on demand",
      description: "Automate background on prospects, competitors, and market trends before the next conversation.",
      icon: <LineChart className="h-5 w-5 text-primary" />,
    },
    {
      title: "First-draft creative",
      description: "Generate copy, images, and video your team refines rather than builds from scratch.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
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
                {aiContent.advantage ? (
                  <p>{aiContent.advantage}</p>
                ) : (
                  <>
                    <p>In today&apos;s rapidly evolving technological landscape, proficiency in AI isn&apos;t optional, it&apos;s essential. Learning how to leverage AI is the most valuable skill not just for the future, but today. Organizations that effectively leverage AI gain significant advantages in efficiency, capability, personalization, and market insights.</p>
                    <p>It&apos;s not hyperbole to say that learning how to use these tools is like equipping yourself with knowledge and creation superpowers.</p>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-3 flex items-center text-foreground">
                <TrendingUp className="mr-2.5 text-primary" size={18} />
                Strategic AI Implementation
              </h3>
              <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-3">
                {aiContent.strategy ? (
                  <p>{aiContent.strategy}</p>
                ) : (
                  <>
                    <p>My approach focuses on implementation that aligns with your business objectives. Rather than adopting AI for its own sake, I help organizations identify specific areas where AI can solve real problems and drive measurable results. However on a base level, I implore everyone to familiarize yourself with these tools in whatever way possible.</p>
                    <p>A few examples of how almost any business can utilize these tools:</p>
                  </>
                )}
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
              <motion.h3 variants={itemVariants} className="text-lg font-bold mb-6 flex items-center">
                <Zap className="mr-2 text-primary" size={18} />
                Practical Applications
              </motion.h3>

              <div className="space-y-5">
                {aiApplications.map((app, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4 border-b border-white/[0.04] pb-5 last:border-none last:pb-0"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">{app.icon}</div>
                    <div>
                      <h4 className="font-semibold text-base mb-0.5 text-foreground">{app.title}</h4>
                      <p className="text-muted-foreground text-sm">{app.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Council of Ideas Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link href="/council-of-ideas">
              <div className="group relative overflow-hidden rounded-2xl p-6 md:p-8 cursor-pointer border border-primary/20 transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                style={{ background: "linear-gradient(135deg, hsl(16 78% 55% / 0.15), hsl(28 83% 62% / 0.10))" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent pointer-events-none" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[hsl(203,61%,20%,0.5)] text-primary flex-shrink-0">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1.5 text-foreground group-hover:text-[hsl(203,61%,30%)] transition-colors">
                        The Council of Ideas
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        What happens when you assemble history's sharpest minds to pressure-test a real decision?
                        A meta demonstration of using AI councils for structured perspective and clearer thinking.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-[hsl(203,61%,30%)] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIExpertiseSection;
