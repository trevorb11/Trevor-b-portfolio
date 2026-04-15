import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const HumanitySection = () => {
  return (
    <section id="humanity" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-5">
                <Heart size={20} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                Keeping the Human in the Machine
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                As AI and automation make the act of creation faster, they also
                make sameness easier. More output does not automatically create
                more connection.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                The people and organizations that use these tools best will be
                the ones who know how to keep the humanity in everything they
                do. The ones who bring real judgment, voice, warmth, and
                intention into what they share with the world. The value of
                authenticity is skyrocketing.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                The best technology should not replace humanity.{" "}
                <span className="text-foreground font-medium">
                  It instead democratizes methods of creative expression.
                </span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 bg-card/50 aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/TUVw5t0TC18?si=RuRg718V1Z10C09K"
                  title="Community Food Share campaign video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <p className="text-center text-muted-foreground/50 text-xs mt-3 font-mono tracking-wide">
                Community Food Share &mdash; Making Spirits Bright
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HumanitySection;
