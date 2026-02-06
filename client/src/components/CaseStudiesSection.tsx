import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  highlights: { icon: React.ReactNode; label: string; value: string }[];
  tag: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "community-food-share",
    title: "Transforming Donor Engagement",
    client: "Community Food Share",
    description:
      "A comprehensive marketing technology overhaul for Colorado's largest food bank, implementing custom tools that increased donor retention, streamlined event management, and created personalized impact experiences.",
    highlights: [
      { icon: <TrendingUp className="h-4 w-4" />, label: "Donor Retention", value: "+32%" },
      { icon: <Users className="h-4 w-4" />, label: "Monthly Donors", value: "+45%" },
      { icon: <Zap className="h-4 w-4" />, label: "Tools Built", value: "4" },
      { icon: <Calendar className="h-4 w-4" />, label: "Engagement", value: "Year-Round" },
    ],
    tag: "Nonprofit MarTech",
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Case Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base">
            Deep dives into transformative projects and their measurable impact.
          </p>
        </motion.div>

        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="premium-card p-8">
                <span className="inline-block text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-4 bg-emerald-500/10 text-emerald-400">
                  {study.tag}
                </span>

                <p className="text-sm text-muted-foreground mb-1">{study.client}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl text-sm md:text-base">
                  {study.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {study.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2 text-primary mb-1">
                        {highlight.icon}
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {highlight.label}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {highlight.value}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/10 hover:border-white/20 hover:bg-white/[0.04] group/btn"
                >
                  <Link href={`/case-study/${study.id}`}>
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
