import React from "react";
import { motion } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CmsContent } from "@shared/schema";
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
                    Turning disconnected tools into working systems
                  </h2>
                  <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                    <p>
                      Most teams do not need more tools. They need the tools they
                      already have to work together better.
                    </p>
                    <p>
                      I help connect CRMs, automation platforms, analytics,
                      content systems, and outreach channels so information moves
                      where it should, work stops getting lost in the gaps, and
                      people can spend less time patching together processes by
                      hand.
                    </p>
                    <p className="text-foreground/80 font-medium">
                      The goal is not complexity. It's flow. Systems that flow
                      make all the difference in the world.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-8">
                <BeforeAfterToggle />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MarketingIntegrationSection;
