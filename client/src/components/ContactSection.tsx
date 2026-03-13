import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Link } from "wouter";
import { contactFormSchema, type ContactForm } from "@shared/schema";

const inputClasses = "w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:ring-primary/20 transition-colors";

const ContactSection = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      marketingConsent: false
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll respond as soon as possible.",
      });
      form.reset();
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    mutate(data);
  };

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
                  href="https://www.linkedin.com/in/trevor-bosetti-9a291a126/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
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
            {formSubmitted ? (
              <div className="premium-card p-8 text-center">
                <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                <p className="text-muted-foreground mb-6 text-sm">Your message has been sent successfully. I'll get back to you soon!</p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" className={inputClasses} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" className={inputClasses} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone (optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" className={inputClasses} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can I help you?" className={inputClasses} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</FormLabel>
                        <FormControl>
                          <Textarea rows={5} placeholder="Your message" className={inputClasses} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-white/[0.06] p-4 bg-white/[0.02]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-foreground/80 cursor-pointer leading-relaxed">
                            I agree to receive SMS messages from Trevor Bosetti related to my inquiry, scheduling, project discussion, and follow-up communication. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase.
                          </FormLabel>
                          <p className="text-xs text-muted-foreground/60 pt-1">
                            View our{" "}
                            <Link href="/privacy-policy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                            {" "}and{" "}
                            <Link href="/terms-and-conditions" className="text-primary hover:underline">
                              Terms and Conditions
                            </Link>
                            .
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-8 h-11"
                  >
                    {isPending ? "Sending..." : "Send Message"}
                    {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
