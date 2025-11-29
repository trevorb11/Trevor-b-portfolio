import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import { Project } from "@shared/schema";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredProjects = projects ? 
    (activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter)
    ) : [];

  return (
    <section id="projects" className="py-20 px-4 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">My Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl">
            Results-driven builds and campaigns.
          </p>
        </motion.div>

        {/* Project Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Button
            variant={activeFilter === "all" ? "default" : "ghost"}
            onClick={() => handleFilterClick("all")}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            size="sm"
          >
            All
          </Button>
          <Button
            variant={activeFilter === "crm-integration" ? "default" : "ghost"}
            onClick={() => handleFilterClick("crm-integration")}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            size="sm"
          >
            CRM Integration
          </Button>
          <Button
            variant={activeFilter === "automation" ? "default" : "ghost"}
            onClick={() => handleFilterClick("automation")}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            size="sm"
          >
            Automation
          </Button>
          <Button
            variant={activeFilter === "lead-generation" ? "default" : "ghost"}
            onClick={() => handleFilterClick("lead-generation")}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            size="sm"
          >
            Lead Generation
          </Button>
          <Button
            variant={activeFilter === "ai-marketing" ? "default" : "ghost"}
            onClick={() => handleFilterClick("ai-marketing")}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            size="sm"
          >
            AI Marketing
          </Button>
        </div>

        {/* Projects Grid - 2 column layout like Rank Zone */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card/50 border border-border/50 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
