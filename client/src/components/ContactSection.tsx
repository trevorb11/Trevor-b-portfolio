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
import { ArrowRight, Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { contactFormSchema, type ContactForm } from "@shared/schema";

const ContactSection = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
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
    <section id="contact" className="py-20 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">Email</h4>
                  <a href="mailto:trevor@rankzone.studio" className="text-muted-foreground hover:text-primary transition-colors">
                    trevor@rankzone.studio
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">Location</h4>
                  <p className="text-muted-foreground">Denver, Colorado</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-foreground">Connect With Me</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <Linkedin className="h-6 w-6 text-primary" />
              </a>
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <Github className="h-6 w-6 text-primary" />
              </a>
              <a href="#" className="bg-primary/20 p-3 rounded-full hover:bg-primary/30 transition-colors">
                <Twitter className="h-6 w-6 text-primary" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send Me a Message</h3>

            {formSubmitted ? (
              <div className="bg-primary/10 rounded-lg p-6 text-center">
                <h4 className="text-xl font-medium mb-2">Thank You!</h4>
                <p className="mb-4">Your message has been sent successfully. I'll get back to you soon!</p>
                <Button 
                  onClick={() => setFormSubmitted(false)}
                  className="bg-primary hover:bg-secondary"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="w-full bg-card/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:ring-primary"
                              {...field}
                            />
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
                          <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email address"
                              className="w-full bg-card/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can I help you?"
                            className="w-full bg-card/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:ring-primary"
                            {...field}
                          />
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
                        <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Your message"
                            className="w-full bg-card/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    {isPending ? "Sending..." : "Send Message"}
                    {!isPending && <ArrowRight className="ml-2 h-5 w-5" />}
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
