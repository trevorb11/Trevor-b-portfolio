import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  "automation": {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    label: "Marketing Automation",
  },
  "ai-marketing": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    label: "AI Marketing",
  },
  "lead-generation": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    label: "Lead Generation",
  },
  "crm-integration": {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    label: "CRM Integration",
  },
  "integration": {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    label: "System Integration",
  },
  "data-visualization": {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    label: "Data Visualization",
  },
  "custom-dev": {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    label: "Custom Dev",
  },
  "campaign-strategy": {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    label: "Campaign Strategy",
  },
  "event-tech": {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    label: "Event Tech",
  },
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const categoryStyle = categoryStyles[project.category] || {
    bg: "bg-slate-500/10",
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
      className="premium-card group p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`${categoryStyle.bg} ${categoryStyle.text} text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider`}
        >
          {categoryStyle.label}
        </span>
        {hasLink && (
          <a
            href={project.link!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/50 hover:text-primary transition-colors p-1"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
        {project.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
        {project.description}
      </p>

      {hasLink && (
        <a
          href={project.link!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary/80 hover:text-primary font-medium text-sm mt-5 transition-colors group/link"
        >
          View Project
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
