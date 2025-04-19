import React from "react";

const AuroraDivider: React.FC = () => {
  return (
    <div className="h-32 w-full relative overflow-hidden my-8">
      <div 
        className="aurora absolute inset-0" 
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, var(--c-hi) 0%, transparent 70%),
            radial-gradient(ellipse at 0% 50%, var(--c-fx) 0%, transparent 70%)
          `,
          filter: "blur(60px) saturate(150%)",
          animation: "drift 20s linear infinite"
        }}
      />
    </div>
  );
};

export default AuroraDivider;