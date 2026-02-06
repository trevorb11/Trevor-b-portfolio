import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      glow.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp for a trailing effect
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden lg:block"
      style={{
        width: 600,
        height: 600,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, hsl(16 78% 63% / 0.06) 0%, hsl(16 78% 63% / 0.02) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
};

export default CursorGlow;
