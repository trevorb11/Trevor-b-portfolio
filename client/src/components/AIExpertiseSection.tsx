import React from "react";
import { motion } from "framer-motion";
import { Cpu, BrainCircuit, TrendingUp, Zap, Layers, Code, LineChart, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";

const AIExpertiseSection = () => {
  const { data: cmsContents } = useQuery<CmsContent[]>({
    queryKey: ["/api/cms"],
  });

  // Filter content for this section
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
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const aiApplications = [
    {
      title: "Customer Segmentation",
      description: "ML-powered patterns for targeted campaigns.",
      icon: <Layers className="h-8 w-8 text-primary" />,
    },
    {
      title: "Conversational Marketing",
      description: "AI chatbots that enhance engagement.",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
    },
    {
      title: "Predictive Analytics",
      description: "Forecast trends and campaign performance.",
      icon: <LineChart className="h-8 w-8 text-primary" />,
    },
    {
      title: "Content Optimization",
      description: "Personalized content at scale.",
      icon: <Code className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section id="ai-expertise" className="py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <BrainCircuit size={24} />
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {aiContent.title || "AI: The Essential Skill of Today"}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-[800px] mb-8">
            {aiContent.subtitle || 
              "Artificial Intelligence isn't just the future—it's transforming marketing effectiveness right now."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative"
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0"></div>
            <div className="relative z-10">
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-2xl font-bold mb-3 flex items-center text-foreground">
                  <Cpu className="mr-2 text-primary" size={20} />
                  AI as a Competitive Advantage
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aiContent.advantage || 
                    "AI proficiency isn't optional—it's essential. Organizations leveraging AI gain real advantages in efficiency, personalization, and market insights."}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-3 flex items-center text-foreground">
                  <TrendingUp className="mr-2 text-primary" size={20} />
                  Strategic AI Implementation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aiContent.strategy || 
                    "I focus on AI that solves real problems—not adoption for its own sake. From customer experience to operations, every implementation drives measurable results."}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg p-8">
              <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="mr-2 text-primary" size={20} />
                AI in Marketing: Practical Applications
              </motion.h3>
              
              <div className="space-y-6">
                {aiApplications.map((app, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4 border-b border-border/30 pb-5 last:border-none"
                  >
                    <div className="flex-shrink-0">{app.icon}</div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-foreground">{app.title}</h4>
                      <p className="text-muted-foreground">{app.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIExpertiseSection;