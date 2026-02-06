import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemNode {
  name: string;
  color: string;
}

const tools: SystemNode[] = [
  { name: "HubSpot", color: "hsl(16 78% 63%)" },
  { name: "Salesforce", color: "hsl(200 50% 50%)" },
  { name: "Mailchimp", color: "hsl(45 80% 55%)" },
  { name: "Analytics", color: "hsl(140 45% 50%)" },
  { name: "Zapier", color: "hsl(28 83% 65%)" },
  { name: "Segment", color: "hsl(280 50% 55%)" },
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
 * Inline visualization — toggle + node diagram, no section wrapper.
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
      <div className="flex items-center justify-center gap-3 mb-4">
        <span
          className={`text-xs font-medium transition-colors ${
            !isUnified ? "text-red-400" : "text-muted-foreground/50"
          }`}
        >
          Before
        </span>
        <button
          onClick={() => setIsUnified(!isUnified)}
          className={`relative w-14 h-7 rounded-full transition-colors duration-500 border ${
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
            style={{ width: 22, height: 22 }}
            animate={{ left: isUnified ? 28 : 3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span
          className={`text-xs font-medium transition-colors ${
            isUnified ? "text-emerald-400" : "text-muted-foreground/50"
          }`}
        >
          After
        </span>
      </div>

      {/* Visualization Area */}
      <div className="premium-card p-4 md:p-6">
        <div className="relative w-full aspect-square">
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
                    stroke="hsl(16 78% 63% / 0.3)"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
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
                      stroke="hsl(0 70% 55% / 0.2)"
                      strokeWidth="0.3"
                      strokeDasharray="0.8 1.5"
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
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
                  <span className="text-primary font-bold text-xs font-mono">HUB</span>
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
                className={`px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl border text-[11px] md:text-xs font-medium whitespace-nowrap ${
                  isUnified
                    ? "bg-card/80 border-white/[0.12] text-foreground shadow-lg"
                    : "bg-card/40 border-white/[0.05] text-muted-foreground/70"
                }`}
                animate={{
                  scale: isUnified ? 1 : 0.92,
                  rotate: isUnified ? 0 : (i % 2 === 0 ? -3 : 4),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                  style={{
                    background: isUnified ? tool.color : "hsl(0 0% 40%)",
                    transition: "background 0.5s ease",
                  }}
                />
                {tool.name}
              </motion.div>

              {/* Error indicator for "before" state */}
              <AnimatePresence>
                {!isUnified && i % 2 === 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-400/50"
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
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/50 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <svg width="6" height="6" viewBox="0 0 10 10" className="text-white">
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
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-mono ${
                  isUnified
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isUnified ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                {isUnified
                  ? "All systems connected"
                  : "6 tools — 0 connections"}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterToggle;
