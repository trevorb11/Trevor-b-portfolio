import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Link as LinkIcon, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionHeading from "./SectionHeading";
import AuroraDivider from "./AuroraDivider";

const MarketingIntegrationSection = () => {
  const { data: cmsContents } = useQuery<CmsContent[]>({
    queryKey: ["/api/cms"],
  });

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
    <>
      {/* Section 1: System Integration Expertise */}
      <section id="integrations" className="py-16 md:py-24 bg-card/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="inline-block p-2 rounded-full bg-primary/10 text-primary mb-4">
                <LinkIcon size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                System Integration Expertise
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {integrationsContent.expertise || 
                  "I make your marketing stack work as one unified system—seamless data sync, automated workflows, and integrations that just work."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-center text-foreground">Platforms I Work With</h4>
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
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-4">
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
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AuroraDivider />

      {/* Section 3: Nonprofit Technology Specialization */}
      <section id="nonprofit" className="py-16 md:py-24 bg-card/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="inline-block p-2 rounded-full bg-primary/10 text-primary mb-4">
                <Database size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                Nonprofit Technology Specialization
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {integrationsContent.nonprofit || 
                  "Deep expertise in nonprofit-specific tools. I help organizations maximize donor management, streamline operations, and boost fundraising impact."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-center text-foreground">Nonprofit Technology Stack</h4>
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
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-4">
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
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MarketingIntegrationSection;
