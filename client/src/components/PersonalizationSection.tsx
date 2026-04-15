import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const PersonalizationSection = () => {
  return (
    <section id="personalization" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5"
          >
            <Sparkles size={20} />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-foreground"
          >
            Personalization at scale
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4"
          >
            Real personalization is not just inserting a name into a message.
            It's building systems that make communication more timely, relevant,
            and reflective of the person receiving it.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8"
          >
            Projects like Impact Wrapped are built around that idea: using data,
            storytelling, and connected workflows to create experiences that
            feel personal, clear, and human.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-7 h-11"
            >
              <a
                href="https://cfs-impact.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                See how Impact Wrapped works
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <a
              href="https://Tb-workflow-demo.replit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary/80 hover:text-primary font-medium text-sm transition-colors group/link"
            >
              View AI personalization workflows
              <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalizationSection;
