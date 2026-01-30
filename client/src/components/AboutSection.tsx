import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="I connect systems & make data useful"
          subtitle="Bridging the gap between marketing objectives and technical implementation"
        />

        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative max-w-md"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
            
            {/* Photo placeholder - replace with actual photo */}
            <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-border/50 shadow-2xl bg-gradient-to-br from-card to-card/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">TB</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Trevor Bosetti</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
