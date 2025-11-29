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
    <section id="case-studies" className="py-20 px-4 bg-background/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Case Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Deep dives into transformative projects and their measurable impact.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card/50 border border-border/50 rounded-xl p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                {/* Tag */}
                <span className="inline-block text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider mb-4 bg-emerald-500/15 text-emerald-400">
                  {study.tag}
                </span>

                {/* Client & Title */}
                <p className="text-sm text-muted-foreground mb-1">{study.client}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                  {study.description}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {study.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="bg-background/50 rounded-lg p-4 border border-border/30"
                    >
                      <div className="flex items-center gap-2 text-primary mb-1">
                        {highlight.icon}
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {highlight.label}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        {highlight.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild variant="outline" className="group/btn">
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
