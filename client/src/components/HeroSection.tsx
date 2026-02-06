import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/hero-bg.png')`,
        }}
      />

      {/* Gradient overlays for depth and seamless transition to page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[hsl(203,61%,20%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(203,61%,20%,0.3)] via-transparent to-[hsl(203,61%,20%,0.3)]" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 px-4 max-w-4xl">
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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Building Systems
          <br />
          for <span className="text-gradient-sunset">Impact</span>
        </motion.h1>

        <motion.p
          className="mt-2 text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          I help non-profits and local businesses turn disconnected tools into
          unified systems that drive real, measurable results.
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
            <Link href="#projects">
              View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border border-white/20 text-white bg-white/[0.05] backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all px-8 h-12"
          >
            <Link href="#contact">
              Get in touch
            </Link>
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
