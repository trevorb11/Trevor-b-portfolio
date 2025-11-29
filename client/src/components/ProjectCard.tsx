import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

// Map categories to their style classes - updated for cleaner sunset theme
const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  "automation": {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    label: "Marketing Automation",
  },
  "ai-marketing": {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    label: "AI Marketing",
  },
  "lead-generation": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    label: "Lead Generation",
  },
  "crm-integration": {
    bg: "bg-violet-500/15",
    text: "text-violet-400",
    label: "CRM Integration",
  },
  "integration": {
    bg: "bg-violet-500/15",
    text: "text-violet-400",
    label: "System Integration",
  },
  "data-visualization": {
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    label: "Data Visualization",
  },
  "custom-dev": {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    label: "Custom Dev",
  },
  "campaign-strategy": {
    bg: "bg-teal-500/15",
    text: "text-teal-400",
    label: "Campaign Strategy",
  },
  "event-tech": {
    bg: "bg-indigo-500/15",
    text: "text-indigo-400",
    label: "Event Tech",
  },
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const categoryStyle = categoryStyles[project.category] || {
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    label: "Project",
  };

  const hasLink = project.link !== null && project.link !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card/50 border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-primary/30 hover:bg-card/80 flex flex-col"
    >
      <div className="p-6 flex-grow flex flex-col">
        {/* Category Tag */}
        <span
          className={`${categoryStyle.bg} ${categoryStyle.text} inline-block text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider mb-4 w-fit`}
        >
          {categoryStyle.label}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Link - only show if project has a link */}
        {hasLink && (
          <a
            href={project.link!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm mt-4 transition-colors"
          >
            View Project
            <ExternalLink className="h-4 w-4 ml-1.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
