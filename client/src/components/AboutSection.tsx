import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Anchor, Code, BarChart } from "lucide-react";
import SectionHeading from "./SectionHeading";

const technologies = [
  "HubSpot", "Salesforce", "Mailchimp", "Blackbaud", 
  "Marketo", "Zapier", "Airtable", "Make", "Google Analytics", 
  "GTM", "Tableau", "Python", "R", "OpenAI", "Anthropic"
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 text-white">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading 
          title="I connect systems & make data useful" 
          subtitle="Bridging the gap between marketing objectives and technical implementation"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[var(--c-hi)]/10 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[var(--c-fx)]/10 blur-xl"></div>
              
              <div className="bg-black/30 backdrop-blur-sm p-8 rounded-3xl border border-white/10 relative z-10 shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-[var(--c-hi)]/20 p-3 rounded-lg">
                      <Zap className="w-6 h-6 text-[var(--c-hi)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">System Orchestrator</h3>
                      <p className="text-white/70">
                        I specialize in making marketing systems work together harmoniously, even when they weren't designed to.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-[var(--c-fx)]/20 p-3 rounded-lg">
                      <Anchor className="w-6 h-6 text-[var(--c-fx)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Business Anchor</h3>
                      <p className="text-white/70">
                        I keep technical projects firmly rooted in business goals, making sure they deliver real, measurable value.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-[var(--c-hi)]/20 p-3 rounded-lg">
                      <Code className="w-6 h-6 text-[var(--c-hi)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Tech Translator</h3>
                      <p className="text-white/70">
                        I speak both marketing and tech fluently, bridging communication gaps between teams.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-[var(--c-fx)]/20 p-3 rounded-lg">
                      <BarChart className="w-6 h-6 text-[var(--c-fx)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Data Storyteller</h3>
                      <p className="text-white/70">
                        I turn raw metrics into compelling narratives that engage stakeholders and drive decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--c-hi)] to-[var(--c-fx)]">
              What I bring to the table
            </h3>

            <p className="mb-6 text-white/80 text-lg">
              For over 8 years, I've been the bridge between marketing dreams and technical reality. 
              I understand what marketers need and know how to translate that into systems that actually deliver.
              Most importantly, I focus on turning data into stories that connect with your audience.
            </p>
            
            <p className="mb-8 text-white/80 text-lg">
              I focus on solutions that are maintained by humans—not just bolted together. 
              My approach ensures your marketing tech stack isn't just impressive, but actually empowers your team.
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[var(--c-hi)]">Tech I Work With</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/80 hover:bg-[var(--c-hi)]/20 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Button 
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-[var(--c-hi)] to-[var(--c-fx)] hover:opacity-90 text-black font-medium"
            >
              <Link href="#contact">
                Let's build something great
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
