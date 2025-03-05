import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

// Map categories to their style classes
const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  "business-systems": {
    bg: "bg-blue-100",
    text: "text-primary",
    label: "Business System",
  },
  "websites": {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    label: "Website",
  },
  "software": {
    bg: "bg-green-100",
    text: "text-green-600",
    label: "Software",
  },
  "blog": {
    bg: "bg-purple-100",
    text: "text-purple-600",
    label: "Blog",
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
        <p className="text-muted-foreground mb-4 text-sm h-16 overflow-hidden">
          {project.description}
        </p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 text-xs">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center text-primary hover:text-secondary font-medium text-sm"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
