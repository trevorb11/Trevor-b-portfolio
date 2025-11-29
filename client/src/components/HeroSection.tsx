import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden flex items-center justify-center text-center">
      {/* Animated sunset gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            #1E567C 0%,
            #2D6B8A 15%,
            #6AABCF 35%,
            #F5E0C9 55%,
            #E89A6A 75%,
            #D45A45 100%)`,
        }}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {/* Subtle glow overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 70%, rgba(232, 154, 106, 0.3) 0%, transparent 50%)`,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", repeatType: "reverse" }}
      />
      
      {/* Foreground content */}
      <div className="relative z-10 px-4 max-w-3xl">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          I turn <span className="text-[var(--c-hi)]">messy data</span> into stories people <span className="text-[var(--c-fx)]">feel</span>.
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-lg md:text-2xl text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          MarTech&nbsp;strategist · AI&nbsp;builder · relentless experimenter
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
            className="rounded-full bg-[var(--c-hi)] text-black font-semibold hover:scale-105 transition"
          >
            <Link href="#work">
              See the work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="rounded-full border border-white/70 text-white hover:bg-white/10 transition"
          >
            <Link href="#contact">
              Book a brain-dump
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
