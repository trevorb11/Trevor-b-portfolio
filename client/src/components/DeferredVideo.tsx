import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Keep showcase media off the network until visible, with native playback controls. */
export default function DeferredVideo({ src, label, className }: {
  src: string;
  label: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { threshold: 0.15 });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!visible || reducedMotion) {
      video.pause();
    } else if (hasEntered && !started.current) {
      started.current = true;
      // Autoplay may be blocked; the native play control remains available.
      void video.play().catch(() => {});
    }
  }, [hasEntered, visible, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {hasEntered ? (
        <video ref={videoRef} src={src} aria-label={label}
          controls loop muted playsInline preload="none" className="h-full w-full object-cover" />
      ) : <div role="img" aria-label={label} className="h-full w-full bg-card/50" />}
    </div>
  );
}
