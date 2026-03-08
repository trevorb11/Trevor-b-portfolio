import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "command" | "result" | "blank";
  text: string;
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { type: "command", text: "$ connect --hubspot --salesforce --sync" },
  { type: "result", text: "✓ Synced 12,400 contact records in 3.2s" },
  { type: "blank", text: "" },
  { type: "command", text: "$ automate --email-sequence --segment=high-intent" },
  { type: "result", text: "✓ Drip campaign deployed → 847 leads entered funnel" },
  { type: "blank", text: "" },
  { type: "command", text: "$ integrate --analytics --attribution-model=multi-touch" },
  { type: "result", text: "✓ Attribution pipeline active → 94% data accuracy" },
  { type: "blank", text: "" },
  { type: "command", text: "$ deploy --landing-page --a-b-test --variants=3" },
  { type: "result", text: "✓ 3 variants live → conversion tracking enabled" },
  { type: "blank", text: "" },
  { type: "command", text: "$ report --roi --q4 --format=executive" },
  { type: "result", text: "✓ Generated: 312% ROI | $2.4M pipeline influenced" },
];

const TYPING_SPEED = 35;
const RESULT_DELAY = 400;
const LINE_PAUSE = 800;
const RESTART_DELAY = 3000;

const LiveTerminal = () => {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer to only animate when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const resetTerminal = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
  }, []);

  // Main typing engine
  useEffect(() => {
    if (!isInView) return;

    const line = terminalSequence[currentLineIndex];
    if (!line) {
      // Sequence complete - restart after delay
      const timeout = setTimeout(resetTerminal, RESTART_DELAY);
      return () => clearTimeout(timeout);
    }

    if (line.type === "blank") {
      // Blank line - add immediately and move on
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { text: "", type: "blank" }]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }

    if (line.type === "command") {
      setIsTyping(true);
      if (currentCharIndex < line.text.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].type === "typing") {
              updated[lastIdx] = { text: line.text.slice(0, currentCharIndex + 1), type: "typing" };
            } else {
              updated.push({ text: line.text.slice(0, currentCharIndex + 1), type: "typing" });
            }
            return updated;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, TYPING_SPEED);
        return () => clearTimeout(timeout);
      } else {
        // Finish typing this command
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].type === "typing") {
              updated[lastIdx] = { text: line.text, type: "command" };
            }
            return updated;
          });
          setIsTyping(false);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, LINE_PAUSE / 2);
        return () => clearTimeout(timeout);
      }
    }

    if (line.type === "result") {
      // Show result after a brief delay
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { text: line.text, type: "result" }]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, RESULT_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [isInView, currentLineIndex, currentCharIndex, resetTerminal]);

  return (
    <section className="py-16 md:py-24 px-4 relative" ref={containerRef}>
      <div className="container mx-auto max-w-3xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal Window */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(203_50%_16%)] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground/60 font-mono ml-2">trevor@martech ~ /integrations</span>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="bg-[hsl(203_55%_12%)] p-5 font-mono text-sm leading-relaxed min-h-[280px] max-h-[340px] overflow-y-auto"
            >
              {displayedLines.map((line, i) => {
                if (line.type === "blank") {
                  return <div key={i} className="h-4" />;
                }
                if (line.type === "result") {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-emerald-400/90 pl-2"
                    >
                      {line.text}
                    </motion.div>
                  );
                }
                // command or typing
                return (
                  <div key={i} className="text-foreground/90">
                    {line.text}
                    {line.type === "typing" && i === displayedLines.length - 1 && (
                      <span
                        className={`inline-block w-[8px] h-[14px] ml-0.5 align-middle bg-primary/80 ${
                          showCursor ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transition: "opacity 0.1s" }}
                      />
                    )}
                  </div>
                );
              })}
              {/* Cursor when idle between lines */}
              {!isTyping && displayedLines.length > 0 && displayedLines[displayedLines.length - 1]?.type !== "typing" && (
                <div className="text-foreground/90">
                  <span className="text-muted-foreground/50">$ </span>
                  <span
                    className={`inline-block w-[8px] h-[14px] ml-0.5 align-middle bg-primary/80 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transition: "opacity 0.1s" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-muted-foreground/50 text-xs mt-4 font-mono tracking-wide">
            Real workflows. Real results. Automated.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveTerminal;
