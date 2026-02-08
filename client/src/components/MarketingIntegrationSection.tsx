import React from "react";
import { motion } from "framer-motion";
import { Link as LinkIcon, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
import AuroraDivider from "./AuroraDivider";
import BeforeAfterToggle from "./BeforeAfterToggle";

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
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
                      "Whether your CRM is HubSpot, Salesforce, or Mailchimp, I specialize in getting the most value out of your marketing stack by creating seamless integrations that allow your systems to communicate effectively."}
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
                <BeforeAfterToggle />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section with Text Overlay — My AI Vision */}
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
                className="w-full h-auto min-h-[280px] sm:min-h-0 aspect-[4/3] sm:aspect-video object-cover object-top opacity-60"
              >
                <source src="/about-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 flex items-center justify-center p-4 sm:p-8 md:p-12">
                <div className="text-center max-w-3xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                    My AI Vision
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium drop-shadow-lg">
                    AI is not replacing human creativity, it's elevating creative potential. My vision is to help organizations and individuals harness AI as a powerful tool that enhances human capabilities, drives innovation, and enables more meaningful connections through new avenues of expression.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AuroraDivider />

      {/* Humanity in the Digital Age */}
      <section id="humanity" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5">
                  <Heart size={20} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                  Keeping the Human in the Machine
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                  Automation and AI are powerful, but the best systems never lose sight of the people they serve. I believe technology should amplify human connection, not replace it.
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  From leading the creation of this campaign for Community Food Share to building
                  data pipelines that help nonprofits reach more donors &mdash; every system I build
                  starts with one question: <span className="text-foreground font-medium">how does this make someone's life better?</span>
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 bg-card/50 aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/TUVw5t0TC18?si=RuRg718V1Z10C09K"
                    title="Community Food Share campaign video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="text-center text-muted-foreground/50 text-xs mt-3 font-mono tracking-wide">
                  Community Food Share &mdash; Making Spirits Bright
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MarketingIntegrationSection;
