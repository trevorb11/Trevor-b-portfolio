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
      {/* Section 1: System Integration Expertise with Video */}
      <section id="integrations" className="py-16 md:py-24 bg-card/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div variants={itemVariants}>
                <div className="mb-6">
                  <div className="inline-block p-2 rounded-full bg-primary/10 text-primary mb-4">
                    <LinkIcon size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                    System Integration Expertise
                  </h2>
                  <p className="text-muted-foreground">
                    {integrationsContent.expertise || 
                      "I make your marketing stack work as one unified system—seamless data sync, automated workflows, and integrations that just work."}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Platforms I Work With</h4>
                  <div className="flex flex-wrap gap-2">
                    {integrationTools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-card/80 border border-border rounded-lg text-sm"
                      >
                        <span className="font-medium text-foreground">{tool.name}</span>
                        <span className="text-muted-foreground ml-1 text-xs">· {tool.category}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Video */}
              <motion.div variants={itemVariants}>
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl -z-10"></div>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
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

      {/* Video Section with Text Overlay - between Nonprofit and AI */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl -z-10"></div>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto aspect-video object-cover object-top"
              >
                <source src="/about-video.mp4" type="video/mp4" />
              </video>
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 md:p-12">
                <div className="text-center max-w-3xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    My AI Vision
                  </h3>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md">
                    AI is not replacing human creativity, it's elevating creative potential. My vision is to help organizations and individuals harness AI as a powerful tool that enhances human capabilities, enables more meaningful connections through expression, and drives innovation. Thriving in this new era means effectively blending human expertise with the rapid improvement of AI capabilities.
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
