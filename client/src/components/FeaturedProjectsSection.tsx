import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Trophy, BarChart3, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    title: "Impact Wrapped",
    description: "A personalized annual impact report inspired by Spotify Wrapped, showing donors exactly how their contributions made a difference.",
    tag: "Data Visualization",
    tagColor: "bg-rose-500/15 text-rose-400",
    icon: <Sparkles className="h-8 w-8" />,
    link: "https://cfs-impact.replit.app/",
  },
  {
    title: "Rank Zone",
    description: "Interactive leaderboard system for competitive fundraising campaigns with real-time updates and gamification elements.",
    tag: "Gamification",
    tagColor: "bg-amber-500/15 text-amber-400",
    icon: <Trophy className="h-8 w-8" />,
  },
  {
    title: "Corporate Challenge Leaderboard",
    description: "Enterprise-grade dashboard tracking corporate team performance in fundraising challenges with live rankings.",
    tag: "Enterprise Dashboard",
    tagColor: "bg-indigo-500/15 text-indigo-400",
    icon: <BarChart3 className="h-8 w-8" />,
  },
];

const FeaturedProjectsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="featured" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Featured Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlight projects that showcase the intersection of marketing strategy and technical innovation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="group border border-border bg-card/80 hover:bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {project.icon}
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${project.tagColor}`}>
                      {project.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm flex-1 mb-4">
                    {project.description}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                      View Project
                      <ExternalLink className="h-4 w-4 ml-1.5" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="#projects">
                View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
