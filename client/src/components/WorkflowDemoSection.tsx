import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, GitBranch, MessageSquare } from "lucide-react";

const WorkflowDemoSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="premium-card relative overflow-hidden p-8 md:p-12">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Interactive Workflow Demo
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
                  See how AI-powered conversational workflows can qualify leads naturally while
                  following a structured 96-path decision tree underneath. Natural conversation
                  on top, systematic funnel below.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    96 possible paths
                  </span>
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    3 simple questions
                  </span>
                </div>
                <Button
                  asChild
                  className="group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-6 h-10"
                >
                  <Link href="/workflow-demo">
                    Try the Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowDemoSection;
