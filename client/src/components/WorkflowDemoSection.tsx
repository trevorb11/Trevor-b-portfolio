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
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-12">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl -z-10 opacity-50"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Interactive Workflow Demo
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
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
                <Button asChild className="group">
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
