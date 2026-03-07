import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Building2, Utensils, Wrench, Gamepad2 } from "lucide-react";

interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tagColor: string;
  tag: string;
  projectCount: number;
}

const categories: PortfolioCategory[] = [
  {
    id: "impact-wrapped",
    title: "Impact Wrapped",
    description:
      "A Spotify Wrapped-inspired experience that turns donor data into personalized, animated impact stories — showing each supporter exactly how their contributions made a difference.",
    icon: <Sparkles className="h-6 w-6" />,
    tagColor: "bg-rose-500/10 text-rose-400",
    tag: "Data Visualization",
    projectCount: 1,
  },
  {
    id: "community-food-share",
    title: "Community Food Share",
    description:
      "A full suite of custom MarTech tools built for Colorado's largest food bank — from donor engagement campaigns to event portals and impact storytelling.",
    icon: <Utensils className="h-6 w-6" />,
    tagColor: "bg-emerald-500/10 text-emerald-400",
    tag: "Nonprofit MarTech",
    projectCount: 6,
  },
  {
    id: "home-builder-studio",
    title: "HomeBuilder Studio",
    description:
      "An AI-first CRM platform that modernizes how home builders manage leads, customers, and the sales process with intelligent automation and a clean interface.",
    icon: <Building2 className="h-6 w-6" />,
    tagColor: "bg-amber-500/10 text-amber-400",
    tag: "AI & CRM",
    projectCount: 1,
  },
  {
    id: "nonprofit-tools",
    title: "Nonprofit Tools & Workflows",
    description:
      "Purpose-built tools for nonprofit operations — smart video embeds that drive conversions, gamified fundraising leaderboards, and custom event registration portals.",
    icon: <Wrench className="h-6 w-6" />,
    tagColor: "bg-indigo-500/10 text-indigo-400",
    tag: "Custom Development",
    projectCount: 3,
  },
  {
    id: "fun-projects",
    title: "Fun Projects",
    description:
      "Side projects and creative experiments — from AI-powered travel planning and trivia generators to competitive league tracking systems.",
    icon: <Gamepad2 className="h-6 w-6" />,
    tagColor: "bg-sky-500/10 text-sky-400",
    tag: "Experiments",
    projectCount: 3,
  },
];

const ProjectsSection = () => {
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

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={index === categories.length - 1 && categories.length % 2 !== 0 ? "md:col-span-2 md:max-w-[calc(50%-0.625rem)] md:mx-auto" : ""}
            >
              <Link href={`/case-study/${category.id}`}>
                <div className="premium-card group p-7 flex flex-col h-full cursor-pointer">
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    <span
                      className={`${category.tagColor} text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider`}
                    >
                      {category.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground/70">
                      {category.projectCount} {category.projectCount === 1 ? "project" : "projects"}
                    </span>
                    <span className="inline-flex items-center text-primary/80 group-hover:text-primary font-medium text-sm transition-colors">
                      View Case Study
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
