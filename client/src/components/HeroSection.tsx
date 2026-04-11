import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const ROTATING_PHRASES = [
  "Building systems",
  "Telling stories",
  "Connecting tools",
  "Designing flow",
  "Scaling personalization",
];
const PHRASE_INTERVAL = 2800;

const HeroSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = "/hero-bg.webp";
    img.onload = () => setImgLoaded(true);
    // If already cached, fire immediately
    if (img.complete) setImgLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, PHRASE_INTERVAL);
    return () => clearInterval(timer);
  }, []);
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = 80;
      const top = aboutSection.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center text-center">
      {/* Background image - tiny placeholder blur-up, then swap to full WebP */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url('/hero-bg.webp')` }}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-opacity duration-700 ${imgLoaded ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url('/hero-bg-placeholder.webp')`, filter: "blur(20px)" }}
      />

      {/* Gradient overlays for depth and seamless transition to page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[hsl(203,61%,20%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(203,61%,20%,0.3)] via-transparent to-[hsl(203,61%,20%,0.3)]" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 px-4 max-w-5xl">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm text-sm font-medium text-white/80 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            MarTech Architect
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="relative block h-[1.05em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {ROTATING_PHRASES[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block">
            for <span className="text-gradient-impact">impact</span>
          </span>
        </motion.h1>

        <motion.p
          className="mt-2 text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Getting more from tools, time, and message through connected systems,
          sharper storytelling, and human-centered technology.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-[1.03] transition-all shadow-lg shadow-primary/20 px-8 h-12"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              View Work <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border border-white/20 text-white bg-white/[0.05] backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all px-8 h-12"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              Let's Connect
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
