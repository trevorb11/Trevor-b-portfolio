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
              <div className="relative w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30 bg-card/50">
                <img
                  src="/about-photo.jpeg"
                  alt="Trevor Bosetti"
                  className="w-full h-full object-cover object-center"
                />
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
              Built around sustainable innovation
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                I believe the best innovation is sustainable innovation. The kind
                that helps people grow, move faster, and create more without losing
                the human thread underneath it.
              </p>
              <p>
                My goal is to help businesses and mission-driven teams get the most
                out of the tools, resources, and time already available to them.
                Sometimes that means connecting systems. Sometimes it means
                sharpening a message. Sometimes it means finding better ways to
                tell a story.
              </p>
              <p className="text-foreground/80 font-medium">
                Taking a voice, a mission, and a message, and extending its reach
                through technology, storytelling, and smarter systems.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Strategy", "Systems", "Story"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold uppercase tracking-wider text-foreground/80"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
