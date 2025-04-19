import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden flex items-center justify-center text-center">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 120%, var(--c-fx) 0%, transparent 60%), 
                      radial-gradient(circle at 80% -20%, var(--c-hi) 0%, transparent 60%), 
                      var(--c-bg)`,
        }}
        initial={{ scale: 1.2, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
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
