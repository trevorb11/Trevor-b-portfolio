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
      title: "Customer Segmentation",
      description: "ML-powered patterns for targeted campaigns.",
      icon: <Layers className="h-5 w-5 text-primary" />,
    },
    {
      title: "Conversational Marketing",
      description: "AI chatbots that enhance engagement.",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
    },
    {
      title: "Predictive Analytics",
      description: "Forecast trends and campaign performance.",
      icon: <LineChart className="h-5 w-5 text-primary" />,
    },
    {
      title: "Content Optimization",
      description: "Personalized content at scale.",
      icon: <Code className="h-5 w-5 text-primary" />,
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
            {aiContent.title || "AI: The Essential Skill of Today"}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl text-sm md:text-base">
            {aiContent.subtitle ||
              "Artificial Intelligence isn't just the future \u2014 it's transforming marketing effectiveness right now."}
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
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {aiContent.advantage ||
                  "AI proficiency isn't optional \u2014 it's essential. Organizations leveraging AI gain real advantages in efficiency, personalization, and market insights."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-3 flex items-center text-foreground">
                <TrendingUp className="mr-2.5 text-primary" size={18} />
                Strategic AI Implementation
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {aiContent.strategy ||
                  "I focus on AI that solves real problems \u2014 not adoption for its own sake. From customer experience to operations, every implementation drives measurable results."}
              </p>
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
              <div className="premium-card group relative overflow-hidden p-6 md:p-8 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] pointer-events-none" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1.5 text-foreground group-hover:text-primary transition-colors">
                        The Council of Ideas
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        What happens when you assemble history's sharpest minds to pressure-test a real decision?
                        A meta demonstration of using AI councils for structured perspective and clearer thinking.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1.5" />
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
