import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

// Map categories to their style classes
const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  "automation": {
    bg: "bg-blue-100",
    text: "text-primary",
    label: "Marketing Automation",
  },
  "ai-marketing": {
    bg: "bg-purple-100",
    text: "text-purple-600",
    label: "AI Marketing",
  },
  "lead-generation": {
    bg: "bg-green-100",
    text: "text-green-600",
    label: "Lead Generation",
  },
  "integration": {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    label: "System Integration",
  },
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const categoryStyle = categoryStyles[project.category] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
    label: "Other",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-2"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span
            className={`${categoryStyle.bg} ${categoryStyle.text} text-xs px-2 py-1 rounded-full font-medium`}
          >
            {categoryStyle.label}
          </span>
        </div>
        <p className="text-muted-foreground mb-6 text-sm h-16 overflow-hidden">
          {project.description}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-secondary font-medium text-sm"
        >
          Visit Project
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
