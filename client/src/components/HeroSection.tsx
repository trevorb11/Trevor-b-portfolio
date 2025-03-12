import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Trevor Bosetti</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              MarTech Expert & Strategic Consultant
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="inline-flex items-center"
              >
                <Link href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="inline-flex items-center"
              >
                <Link href="#contact">
                  Contact Me
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              alt="Trevor Bosetti"
              className="rounded-2xl shadow-lg w-full h-auto max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
