import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemNode {
  name: string;
  color: string;
}

const tools: SystemNode[] = [
  { name: "Website", color: "hsl(200 50% 50%)" },
  { name: "Social Media", color: "hsl(280 50% 55%)" },
  { name: "Blog", color: "hsl(140 45% 50%)" },
  { name: "Paid Media", color: "hsl(16 78% 63%)" },
  { name: "Email", color: "hsl(45 80% 55%)" },
  { name: "SEO", color: "hsl(28 83% 65%)" },
];

// Scattered positions for "before" state
const scatteredPositions = [
  { x: 8, y: 12 },
  { x: 62, y: 8 },
  { x: 30, y: 58 },
  { x: 72, y: 55 },
  { x: 10, y: 78 },
  { x: 68, y: 82 },
];

// Organized circle positions for "after" state
const organizedPositions = [
  { x: 50, y: 10 },
  { x: 82, y: 32 },
  { x: 82, y: 68 },
  { x: 50, y: 90 },
  { x: 18, y: 68 },
  { x: 18, y: 32 },
];

/**
 * Inline visualization - toggle + node diagram, no section wrapper.
 * Can be embedded inside any parent layout.
 */
const BeforeAfterToggle = () => {
  const [isUnified, setIsUnified] = useState(false);

  const positions = isUnified ? organizedPositions : scatteredPositions;
  const centerX = 50;
  const centerY = 50;

  return (
    <div>
      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <span
          className={`text-sm font-semibold transition-colors ${
            !isUnified ? "text-red-400" : "text-muted-foreground/50"
          }`}
        >
          Before
        </span>
        <button
          onClick={() => setIsUnified(!isUnified)}
          className={`relative w-16 h-8 rounded-full transition-colors duration-500 border ${
            isUnified
              ? "bg-emerald-500/20 border-emerald-500/30"
              : "bg-red-500/15 border-red-500/25"
          }`}
          aria-label={isUnified ? "Show disconnected state" : "Show unified state"}
        >
          <motion.div
            className={`absolute top-0.5 w-5.5 h-5.5 rounded-full shadow-lg ${
              isUnified ? "bg-emerald-400" : "bg-red-400"
            }`}
            style={{ width: 24, height: 24 }}
            animate={{ left: isUnified ? 32 : 3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span
          className={`text-sm font-semibold transition-colors ${
            isUnified ? "text-emerald-400" : "text-muted-foreground/50"
          }`}
        >
          After
        </span>
      </div>

      {/* Visualization Area */}
      <div className="premium-card p-5 md:p-8">
        <div className="relative w-full aspect-[3/4] md:aspect-square">
          {/* SVG for connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <AnimatePresence>
              {isUnified &&
                organizedPositions.map((pos, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="hsl(16 78% 63% / 0.5)"
                    strokeWidth="0.5"
                    strokeDasharray="1.5 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                ))}
            </AnimatePresence>

            <AnimatePresence>
              {!isUnified &&
                scatteredPositions.slice(0, 3).map((pos, i) => {
                  const next = scatteredPositions[i + 1] || scatteredPositions[0];
                  return (
                    <motion.line
                      key={`broken-${i}`}
                      x1={pos.x + 5}
                      y1={pos.y + 3}
                      x2={(pos.x + next.x) / 2}
                      y2={(pos.y + next.y) / 2}
                      stroke="hsl(0 70% 55% / 0.4)"
                      strokeWidth="0.5"
                      strokeDasharray="1 1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  );
                })}
            </AnimatePresence>
          </svg>

          {/* Center hub (after state only) */}
          <AnimatePresence>
            {isUnified && (
              <motion.div
                className="absolute z-10"
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/15">
                  <span className="text-primary font-bold text-sm font-mono">HUB</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tool Nodes */}
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="absolute z-20"
              animate={{
                left: `${positions[i].x}%`,
                top: `${positions[i].y}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: i * 0.05,
              }}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl border text-xs md:text-sm font-semibold whitespace-nowrap ${
                  isUnified
                    ? "bg-card/90 border-white/[0.15] text-foreground shadow-lg"
                    : "bg-card/60 border-white/[0.08] text-muted-foreground/80"
                }`}
                animate={{
                  scale: isUnified ? 1 : 0.92,
                  rotate: isUnified ? 0 : (i % 2 === 0 ? -3 : 4),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{
                    background: isUnified ? tool.color : "hsl(0 0% 45%)",
                    transition: "background 0.5s ease",
                  }}
                />
                {tool.name}
              </motion.div>

              {/* Error indicator for "before" state */}
              <AnimatePresence>
                {!isUnified && i % 2 === 0 && (
                  <motion.div
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-500/90 border border-red-400/60"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  />
                )}
              </AnimatePresence>

              {/* Check indicator for "after" state */}
              <AnimatePresence>
                {isUnified && (
                  <motion.div
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-400/60 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <svg width="7" height="7" viewBox="0 0 10 10" className="text-white">
                      <path d="M2 5 L4.5 7.5 L8 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Status text overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isUnified ? "unified" : "scattered"}
              className="absolute bottom-1 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-mono ${
                  isUnified
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isUnified ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                {isUnified
                  ? "All systems connected"
                  : "6 tools, 0 connections"}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterToggle;
