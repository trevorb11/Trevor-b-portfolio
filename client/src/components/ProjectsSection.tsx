import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my MarTech portfolio showcasing CRM integrations, automation workflows, lead generation solutions, and AI-powered marketing tools that drive measurable business results.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => handleFilterClick("all")}
            className="px-4 py-2 rounded-lg font-medium"
          >
            All Projects
          </Button>
          <Button
            variant={activeFilter === "crm-integration" ? "default" : "outline"}
            onClick={() => handleFilterClick("crm-integration")}
            className="px-4 py-2 rounded-lg font-medium"
          >
            CRM Integration
          </Button>
          <Button
            variant={activeFilter === "automation" ? "default" : "outline"}
            onClick={() => handleFilterClick("automation")}
            className="px-4 py-2 rounded-lg font-medium"
          >
            Automation
          </Button>
          <Button
            variant={activeFilter === "lead-generation" ? "default" : "outline"}
            onClick={() => handleFilterClick("lead-generation")}
            className="px-4 py-2 rounded-lg font-medium"
          >
            Lead Generation
          </Button>
          <Button
            variant={activeFilter === "ai-marketing" ? "default" : "outline"}
            onClick={() => handleFilterClick("ai-marketing")}
            className="px-4 py-2 rounded-lg font-medium"
          >
            AI Marketing
          </Button>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="inline-flex items-center"
          >
            <Link href="#projects">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
