import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link as LinkIcon, Database } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

  return (
    <>
      {/* System Integration Expertise with Video */}
      <section id="integrations" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div variants={itemVariants}>
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5">
                    <LinkIcon size={20} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                    System Integration Expertise
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {integrationsContent.expertise ||
                      "I make your marketing stack work as one unified system\u2014seamless data sync, automated workflows, and integrations that just work."}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                    Platforms I Work With
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {integrationTools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm transition-colors hover:border-primary/20"
                      >
                        <span className="font-medium text-foreground/90">{tool.name}</span>
                        <span className="text-muted-foreground/60 ml-1.5 text-xs">{tool.category}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 bg-card/50">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto aspect-square object-cover"
                  >
                    <source src="/integration-video.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <AuroraDivider />

      {/* Nonprofit Technology Specialization */}
      <section id="nonprofit" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5">
                <Database size={20} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                Nonprofit Technology Specialization
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                {integrationsContent.nonprofit ||
                  "Deep expertise in nonprofit-specific tools. I help organizations maximize donor management, streamline operations, and boost fundraising impact."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-5 text-center">
                Nonprofit Technology Stack
              </p>
              <div className="w-full relative">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="w-full"
                >
                  <CarouselContent>
                    {nonprofitTools.map((tool, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-4">
                        <div className="p-1">
                          <Card className="premium-card h-full border-0">
                            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                              <p className="font-medium text-center text-foreground text-sm">{tool.name}</p>
                              <p className="text-xs text-muted-foreground/60 text-center mt-1">{tool.category}</p>
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

      {/* Video Section with Text Overlay */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 bg-card/50">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto min-h-[280px] sm:min-h-0 aspect-[4/3] sm:aspect-video object-cover object-top"
              >
                <source src="/about-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 flex items-center justify-center p-4 sm:p-8 md:p-12">
                <div className="text-center max-w-3xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                    My AI Vision
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    AI is not replacing human creativity &mdash; it's elevating creative potential. My vision is to help organizations and individuals harness AI as a powerful tool that enhances human capabilities, drives innovation, and enables more meaningful connections through new avenues of expression.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MarketingIntegrationSection;
