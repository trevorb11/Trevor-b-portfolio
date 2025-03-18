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
      title: "AI-Powered Customer Segmentation",
      description: "Using machine learning to identify patterns and segment customers for more targeted marketing campaigns.",
      icon: <Layers className="h-10 w-10 text-primary" />,
    },
    {
      title: "Conversational Marketing",
      description: "Implementing AI chatbots and conversational interfaces to enhance customer engagement.",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
      title: "Predictive Analytics",
      description: "Leveraging AI to forecast trends, customer behavior, and campaign performance.",
      icon: <LineChart className="h-10 w-10 text-primary" />,
    },
    {
      title: "Content Generation & Optimization",
      description: "Using AI tools to create, optimize, and personalize marketing content at scale.",
      icon: <Code className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <section id="ai-expertise" className="py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
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
          <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400 max-w-[800px] mb-8">
            {aiContent.subtitle || 
              "Artificial Intelligence isn't just the future—it's transforming marketing effectiveness right now."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
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
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Cpu className="mr-2 text-primary" size={20} />
                  AI as a Competitive Advantage
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {aiContent.advantage || 
                    "In today's rapidly evolving digital landscape, proficiency in AI isn't optional—it's essential. I view AI as the most valuable skill not just for the future, but starting today. Organizations that effectively leverage AI technologies gain significant advantages in efficiency, personalization, and market insights."}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-primary" size={20} />
                  Strategic AI Implementation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {aiContent.strategy || 
                    "My approach focuses on strategic AI implementation that aligns with your business objectives. Rather than adopting AI for its own sake, I help organizations identify specific areas where AI can solve real problems and drive measurable results, from customer experience to operational efficiency."}
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="mr-2 text-primary" size={20} />
                AI in Marketing: Practical Applications
              </motion.h3>
              
              <div className="space-y-6">
                {aiApplications.map((app, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-5 last:border-none"
                  >
                    <div className="flex-shrink-0">{app.icon}</div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{app.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{app.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-8 text-center"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
            {aiContent.vision_title || "My AI Vision"}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {aiContent.vision || 
              "AI is not replacing human creativity—it's augmenting it. My vision is to help organizations harness AI as a powerful tool that enhances human capabilities, enables more meaningful customer connections, and drives innovation. The organizations that thrive will be those that effectively blend human expertise with AI capabilities."}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-6">
            <a href="#contact" className="inline-flex items-center bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Discuss AI Solutions for Your Business
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIExpertiseSection;