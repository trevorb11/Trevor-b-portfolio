import { useState, useEffect, useRef } from "react";
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
  const [isInView, setIsInView] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Only start rotating once the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isInView]);

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
    <section ref={sectionRef} id="featured" className="py-20 md:py-28 relative overflow-hidden">
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

          <div className="max-w-5xl mx-auto">
            {/* Desktop and Mobile Carousel */}
            <div className="relative overflow-hidden group/carousel">
              <div 
                className="flex transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing select-none"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                onMouseDown={(e) => setDragStart(e.clientX)}
                onMouseUp={(e) => {
                  if (dragStart === null) return;
                  const dragEnd = e.clientX;
                  const diff = dragStart - dragEnd;
                  if (Math.abs(diff) > 50) {
                    if (diff > 0) setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
                    else setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
                  }
                  setDragStart(null);
                }}
                onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (dragStart === null) return;
                  const dragEnd = e.changedTouches[0].clientX;
                  const diff = dragStart - dragEnd;
                  if (Math.abs(diff) > 50) {
                    if (diff > 0) setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
                    else setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
                  }
                  setDragStart(null);
                }}
              >
                {featuredProjects.map((proj, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4 md:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      <div className="premium-card group p-8 md:p-10 flex flex-col min-h-[340px] md:min-h-[380px]">
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary">
                            {proj.icon}
                          </div>
                          <span className={`text-xs px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider ${proj.tagColor}`}>
                            {proj.tag}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-muted-foreground text-base flex-1 mb-8 leading-relaxed">
                          {proj.description}
                        </p>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary/80 hover:text-primary font-medium text-sm transition-colors group/link"
                          >
                            View Project
                            <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
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
