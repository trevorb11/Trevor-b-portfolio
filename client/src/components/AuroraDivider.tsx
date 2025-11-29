import React from "react";

const AuroraDivider: React.FC = () => {
  return (
    <div className="h-24 w-full relative overflow-hidden my-4">
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.4) 0%, transparent 70%),
            radial-gradient(ellipse at 0% 50%, hsl(var(--accent) / 0.3) 0%, transparent 70%),
            radial-gradient(ellipse at 100% 50%, hsl(var(--secondary) / 0.3) 0%, transparent 70%)
          `,
          filter: "blur(50px) saturate(120%)",
        }}
      />
    </div>
  );
};

export default AuroraDivider;