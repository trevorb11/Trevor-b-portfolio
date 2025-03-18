import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Link as LinkIcon, Database, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";

const MarketingIntegrationSection = () => {
  const { data: cmsContents } = useQuery<CmsContent[]>({
    queryKey: ["/api/cms"],
  });

  // Filter content for this section
  const integrationsContent = React.useMemo(() => {
    if (!cmsContents) return {};
    
    return cmsContents
      .filter(content => content.section === "integrations")
      .reduce((acc, content) => {
        acc[content.key] = content.value;
        return acc;
      }, {} as Record<string, string>);
  }, [cmsContents]);

  const integrationTools = [
    { name: "HubSpot", category: "CRM & Marketing" },
    { name: "Salesforce", category: "CRM" },
    { name: "Mailchimp", category: "Email Marketing" },
    { name: "Marketo", category: "Marketing Automation" },
    { name: "Google Analytics", category: "Analytics" },
    { name: "Zapier", category: "Integration Platform" },
    { name: "Segment", category: "Customer Data Platform" },
    { name: "ActiveCampaign", category: "Marketing Automation" },
  ];

  const nonprofitTools = [
    { name: "Blackbaud", category: "Nonprofit Management" },
    { name: "Raiser's Edge", category: "Fundraising" },
    { name: "Classy", category: "Fundraising Platform" },
    { name: "Omatic", category: "Data Integration" },
    { name: "DonorPerfect", category: "Donor Management" },
    { name: "Kindful", category: "Nonprofit CRM" },
    { name: "NeonCRM", category: "Constituent Management" },
    { name: "Bloomerang", category: "Donor Management" },
  ];

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

  return (
    <section id="integrations" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
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
              <RefreshCw size={24} />
            </div>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {integrationsContent.title || "Marketing Systems Integration"}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400 max-w-[800px] mb-8">
            {integrationsContent.subtitle || 
              "Specialized in seamlessly connecting marketing systems to maximize your data value and audience engagement."}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <LinkIcon className="mr-2 text-primary" size={20} />
                System Integration Expertise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {integrationsContent.expertise || 
                  "Whether your CRM is HubSpot, Salesforce, or Mailchimp, I specialize in getting the most value out of your marketing stack by creating seamless integrations that allow your systems to communicate effectively."}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {integrationsContent.expertise_detail || 
                  "From data synchronization to automated workflows, I'll help you build a connected marketing ecosystem that leverages your data to engage your audience more effectively and drive better results."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Integration Partners</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {integrationTools.map((tool, index) => (
                  <Card key={index} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-xs text-gray-500">{tool.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Database className="mr-2 text-primary" size={20} />
                Nonprofit Technology Specialization
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {integrationsContent.nonprofit || 
                  "I bring extensive experience with nonprofit-specific technologies, helping organizations leverage tools like Blackbaud, Raiser's Edge, Classy, and Omatic to maximize their impact."}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {integrationsContent.nonprofit_detail || 
                  "Understanding the unique challenges nonprofits face, I provide specialized solutions that streamline operations, improve donor management, and enhance fundraising capabilities through strategic system integration."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Nonprofit Technology Stack</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {nonprofitTools.map((tool, index) => (
                  <Card key={index} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-xs text-gray-500">{tool.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
            {integrationsContent.approach_title || "My Integration Approach"}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {integrationsContent.approach || 
              "I don't just connect systems—I build strategic integration architectures that align with your business goals, ensure data integrity, and create scalable solutions that grow with your organization."}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-6">
            <a href="#contact" className="inline-flex items-center text-primary font-medium hover:underline">
              Discuss your integration needs <ArrowRight className="ml-1" size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingIntegrationSection;