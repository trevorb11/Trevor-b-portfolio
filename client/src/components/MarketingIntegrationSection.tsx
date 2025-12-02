import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Link as LinkIcon, Database, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section id="integrations" className="py-16 md:py-24 bg-card/30">
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
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {integrationsContent.title || "Marketing Systems Integration"}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-[800px] mb-8">
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
              <h3 className="text-2xl font-bold mb-3 flex items-center text-foreground">
                <LinkIcon className="mr-2 text-primary" size={20} />
                System Integration Expertise
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {integrationsContent.expertise || 
                  "I make your marketing stack work as one unified system—seamless data sync, automated workflows, and integrations that just work."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-foreground">Integration Partners</h4>
              <div className="w-full relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {integrationTools.map((tool, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                        <div className="p-1">
                          <Card className="border border-border bg-card/80 h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                              <p className="font-medium text-center text-foreground">{tool.name}</p>
                              <p className="text-xs text-muted-foreground text-center mt-1">{tool.category}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -top-12 right-0 flex space-x-2">
                    <CarouselPrevious className="h-8 w-8" />
                    <CarouselNext className="h-8 w-8" />
                  </div>
                </Carousel>
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
              <h3 className="text-2xl font-bold mb-3 flex items-center text-foreground">
                <Database className="mr-2 text-primary" size={20} />
                Nonprofit Technology Specialization
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {integrationsContent.nonprofit || 
                  "Deep expertise in nonprofit-specific tools. I help organizations maximize donor management, streamline operations, and boost fundraising impact."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-foreground">Nonprofit Technology Stack</h4>
              <div className="w-full relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {nonprofitTools.map((tool, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                        <div className="p-1">
                          <Card className="border border-border bg-card/80 h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                              <p className="font-medium text-center text-foreground">{tool.name}</p>
                              <p className="text-xs text-muted-foreground text-center mt-1">{tool.category}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -top-12 right-0 flex space-x-2">
                    <CarouselPrevious className="h-8 w-8" />
                    <CarouselNext className="h-8 w-8" />
                  </div>
                </Carousel>
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
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-3 text-foreground">
            {integrationsContent.approach_title || "My Integration Approach"}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
            {integrationsContent.approach || 
              "Strategic architectures that align with your goals, ensure data integrity, and scale with your organization."}
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