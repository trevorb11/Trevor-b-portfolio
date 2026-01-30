import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink, TrendingUp, Users, Zap, Calendar, Database, Video, Mail, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectDetail {
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  features: string[];
  link?: string;
  icon: React.ReactNode;
}

const communityFoodShareData = {
  client: "Community Food Share",
  title: "Transforming Donor Engagement Through Custom MarTech Solutions",
  heroDescription:
    "Community Food Share is Colorado's largest food bank, serving Boulder and Broomfield counties. As their marketing technology partner, I developed a suite of custom tools that transformed how they engage with donors, manage events, and communicate impact.",
  challenge:
    "Like many nonprofits, Community Food Share faced the challenge of donor retention and engagement. Their existing tools were disconnected, making it difficult to create personalized experiences, track donor journeys, and demonstrate individual impact. They needed a cohesive technology strategy that would work within their Blackbaud ecosystem while pushing the boundaries of what's possible in nonprofit marketing.",
  approach:
    "Rather than recommending expensive off-the-shelf solutions, I worked closely with the CFS team to identify specific pain points and build custom tools that integrated seamlessly with their existing CRM. Each solution was designed to be maintainable, scalable, and focused on measurable outcomes.",
  results: [
    { icon: <TrendingUp className="h-5 w-5" />, label: "Donor Retention", value: "+32%", description: "Year-over-year improvement in donor retention rates" },
    { icon: <Users className="h-5 w-5" />, label: "Monthly Donors", value: "+45%", description: "Increase in recurring monthly donor conversions" },
    { icon: <Zap className="h-5 w-5" />, label: "Custom Tools", value: "4", description: "Purpose-built solutions deployed" },
    { icon: <Calendar className="h-5 w-5" />, label: "Event Efficiency", value: "60%", description: "Reduction in event management overhead" },
  ],
  projects: [
    {
      title: "Impact Wrapped",
      tag: "Data Visualization",
      tagColor: "bg-rose-500/15 text-rose-400",
      description:
        "Inspired by Spotify Wrapped, I created a personalized annual impact report for each donor. This interactive experience pulls individual donation data and translates it into meaningful metrics—meals provided, families served, and community impact—presented through engaging animations and shareable graphics.",
      features: [
        "Dynamic data visualization pulling from Blackbaud CRM",
        "Personalized impact metrics for each donor",
        "Animated, mobile-responsive experience",
        "Social sharing capabilities for organic reach",
        "Year-over-year comparison for returning donors",
      ],
      link: "https://cfs-impact.replit.app/",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Monthly Donor Upgrade Campaign",
      tag: "Campaign Strategy",
      tagColor: "bg-teal-500/15 text-teal-400",
      description:
        "A sophisticated automated campaign system designed to convert one-time donors into recurring monthly sustainers. The campaign uses behavioral triggers, personalized messaging, and strategic timing to maximize conversion while maintaining authentic donor relationships.",
      features: [
        "Behavioral trigger-based email sequences",
        "A/B tested messaging and timing optimization",
        "Donor segmentation based on giving history",
        "Personalized ask amounts based on capacity",
        "Automated follow-up and nurture sequences",
      ],
      icon: <Mail className="h-6 w-6" />,
    },
    {
      title: "Smart Video Embed Tool",
      tag: "Custom Development",
      tagColor: "bg-orange-500/15 text-orange-400",
      description:
        "A custom YouTube wrapper that transforms passive video viewers into engaged donors. The moment a video ends, viewers are automatically redirected to a contextually relevant landing page, capturing the emotional momentum of impact storytelling.",
      features: [
        "Seamless YouTube video embedding",
        "Automatic redirect on video completion",
        "Customizable destination URLs per video",
        "Analytics integration for conversion tracking",
        "Mobile-optimized experience",
      ],
      icon: <Video className="h-6 w-6" />,
    },
    {
      title: "Custom Event Portal",
      tag: "Event Technology",
      tagColor: "bg-indigo-500/15 text-indigo-400",
      description:
        "An end-to-end event management and ticketing system built specifically for nonprofit event complexity. The portal handles everything from registration to check-in, with full integration to Blackbaud for constituent tracking and post-event engagement.",
      features: [
        "Custom registration forms with conditional logic",
        "Tiered ticketing and table management",
        "Real-time attendee dashboard",
        "Blackbaud CRM integration for constituent data",
        "Automated confirmation and reminder emails",
        "Day-of check-in system with QR codes",
      ],
      icon: <Ticket className="h-6 w-6" />,
    },
  ],
  testimonial: {
    quote:
      "Trevor's approach to our marketing technology challenges was exactly what we needed. Rather than pushing expensive platforms, he built custom solutions that work seamlessly with our existing systems. The Impact Wrapped experience alone has transformed how our donors see their contribution.",
    author: "Marketing Director",
    organization: "Community Food Share",
  },
};

const CaseStudy = () => {
  const { id } = useParams();

  // For now, we only have the Community Food Share case study
  if (id !== "community-food-share") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const data = communityFoodShareData;

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#case-studies">
              <Button variant="ghost" size="sm" className="mb-8 -ml-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>

            <span className="inline-block text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider mb-4 bg-emerald-500/15 text-emerald-400">
              Nonprofit MarTech
            </span>

            <p className="text-muted-foreground mb-2">{data.client}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {data.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Approach */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {data.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                The Approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {data.approach}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Built */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Solutions Delivered
            </h2>
            <p className="text-muted-foreground">
              Four custom tools designed to address specific challenges and integrate seamlessly with existing systems.
            </p>
          </motion.div>

          <div className="space-y-8">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/80 rounded-xl p-8 border border-border/50"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 ${project.tagColor}`}
                    >
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                  >
                    View Live Project
                    <ExternalLink className="h-4 w-4 ml-1.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 rounded-xl p-8 md:p-12 border border-border/50 text-center"
          >
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
              "{data.testimonial.quote}"
            </blockquote>
            <div>
              <p className="font-semibold text-foreground">
                {data.testimonial.author}
              </p>
              <p className="text-sm text-muted-foreground">
                {data.testimonial.organization}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Marketing Technology?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how custom MarTech solutions can solve your organization's unique challenges.
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudy;
