import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Headshot */}
          <motion.div
            className="md:col-span-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30 bg-card/50 flex items-center justify-center">
                <img
                  src="/headshot.webp"
                  alt="Trevor Bosetti"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Fallback initials shown behind the image */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">TB</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Trevor Bosetti</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-foreground">
              Hey, I'm Trevor
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                I'm a marketing technologist based in Colorado with 8+ years of
                experience helping nonprofits and local businesses get more out of
                their tools. I got my start in nonprofit fundraising, where I
                learned firsthand how much time gets lost to disconnected systems
                and manual processes.
              </p>
              <p>
                That experience turned into a career building the integrations and
                automations that let small teams punch above their weight&mdash;connecting
                CRMs, setting up analytics, and creating workflows that actually
                save people time. I care about doing work that matters, and I'm most
                energized when a project helps an organization reach more people or
                stretch their budget further.
              </p>
              <p className="text-foreground/80 font-medium">
                When I'm not wiring systems together, you'll find me hiking the
                Front Range, experimenting with AI tools, or figuring out how to
                make technology feel a little more human.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
