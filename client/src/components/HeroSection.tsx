import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden flex items-center justify-center text-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.png')`,
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Foreground content */}
      <div className="relative z-10 px-4 max-w-3xl">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Building Systems for <span className="text-[var(--c-hi)]">Impact</span>
        </motion.h1>
        
        <motion.p 
          className="mt-2 text-xl md:text-3xl text-white/90 mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          MarTech Architect for non-profits and local businesses
        </motion.p>
        
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition shadow-lg"
          >
            <Link href="#projects">
              Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-white/70 text-white hover:bg-white/10 hover:border-white transition"
          >
            <Link href="#contact">
              Get in touch
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
