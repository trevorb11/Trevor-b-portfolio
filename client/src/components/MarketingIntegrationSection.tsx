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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="integrations" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Two columns: text+video left, toggle right — top-aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: text header + video */}
            <motion.div variants={itemVariants} className="flex flex-col gap-8 lg:-mt-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <LinkIcon size={18} />
                  </span>
                  Making Things Flow
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

              <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-auto block scale-[1.11] origin-center"
                >
                  <source src="/flow-animation.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>

            {/* Right: interactive toggle */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <BeforeAfterToggle />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingIntegrationSection;
