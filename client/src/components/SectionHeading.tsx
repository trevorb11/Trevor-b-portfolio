import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ id, title, subtitle }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -100]);

  return (
    <div className="text-center mb-12">
      <motion.h2
        id={id}
        style={{ y }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight mb-1 text-foreground"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;