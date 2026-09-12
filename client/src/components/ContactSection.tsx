import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/15 to-card/30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">Email</p>
                  <a href="mailto:trevor@rankzone.studio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    trevor@rankzone.studio
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">Location</p>
                  <p className="text-sm text-muted-foreground">Denver, Colorado</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <p className="text-sm font-medium text-foreground mb-4">Connect</p>
              <div className="flex gap-3">
                <a
                  aria-label="Trevor Bosetti on LinkedIn"
                  href="https://www.linkedin.com/in/trevor-bosetti-9a291a126/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  aria-label="Trevor Bosetti on GitHub"
                  href="https://github.com/trevorb11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="premium-card p-8">
              <h3 className="text-xl font-semibold mb-3">Let's start a conversation</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Tell me a little about your team, what you're working on, and where you could use a hand.
              </p>
              <Button asChild className="rounded-full px-8 h-11">
                <a href="mailto:trevor@rankzone.studio">
                  Email Trevor <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Opens your email app. You can also email me directly at{' '}
                <a href="mailto:trevor@rankzone.studio" className="text-primary underline break-all">trevor@rankzone.studio</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
