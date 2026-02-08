import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import { Project } from "@shared/schema";

const filters = [
  { key: "all", label: "All" },
  { key: "crm-integration", label: "CRM Integration" },
  { key: "automation", label: "Automation" },
  { key: "lead-generation", label: "Lead Generation" },
  { key: "ai-marketing", label: "AI Marketing" },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects
    ? activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter)
    : [];

  return (
    <section id="projects" className="py-20 md:py-28 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Portfolio</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            When the pieces come together to create something impactful
          </p>
        </motion.div>

        {/* Portfolio Video */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 max-w-4xl mx-auto bg-card/50">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto aspect-video object-cover"
            >
              <source src="/portfolio-video.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Project Filters */}
        <div className="flex flex-wrap gap-1.5 mb-10 justify-center">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant="ghost"
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent"
              }`}
              size="sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="premium-card h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
