import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ id, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14"
    >
      <h2
        id={id}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
