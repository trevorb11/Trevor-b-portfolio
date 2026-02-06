import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Trophy, BarChart3, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    title: "Impact Wrapped",
    description: "A personalized annual impact report inspired by Spotify Wrapped, showing donors exactly how their contributions made a difference.",
    tag: "Data Visualization",
    tagColor: "bg-rose-500/10 text-rose-400",
    icon: <Sparkles className="h-6 w-6" />,
    link: "https://cfs-impact.replit.app/",
  },
  {
    title: "Rank Zone",
    description: "Interactive leaderboard system for competitive fundraising campaigns with real-time updates and gamification elements.",
    tag: "Gamification",
    tagColor: "bg-amber-500/10 text-amber-400",
    icon: <Trophy className="h-6 w-6" />,
    link: "https://rankzone.replit.app/",
  },
  {
    title: "Corporate Challenge Leaderboard",
    description: "Enterprise-grade dashboard tracking corporate team performance in fundraising challenges with live rankings.",
    tag: "Enterprise Dashboard",
    tagColor: "bg-indigo-500/10 text-indigo-400",
    icon: <BarChart3 className="h-6 w-6" />,
    link: "https://msb-leaderboard.communityfoodshare.org/",
  },
];

const ROTATE_INTERVAL = 5000;

const FeaturedProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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

  const project = featuredProjects[activeIndex];

  return (
    <section id="featured" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Featured Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Projects at the intersection of marketing strategy and technical innovation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-center">
            {/* Left column — rotating project card */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="premium-card group p-7 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      {project.icon}
                    </div>
                    <span className={`text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${project.tagColor}`}>
                      {project.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm flex-1 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary/80 hover:text-primary font-medium text-sm transition-colors group/link"
                    >
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/20 hover:bg-white/30"
                    }`}
                    aria-label={`Show project ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right column — integration video */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 bg-card/50">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto min-h-[280px] sm:min-h-0 aspect-square object-cover"
              >
                <source src="/integration-video.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/10 hover:border-white/20 hover:bg-white/[0.04] px-8 h-11"
            >
              <Link href="#projects">
                View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
