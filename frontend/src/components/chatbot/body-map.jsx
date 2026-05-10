"use client";

import { motion } from "framer-motion";

export function BodyMap({ onSelectPart }) {
  const parts = [
    { id: "head", label: "Head/Brain", path: "M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v.5h-4v-.5c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z", color: "url(#grad-head)" },
    { id: "chest", label: "Chest/Heart", path: "M8 11h8v5c0 1-1 2-4 2s-4-1-4-2v-5z", color: "url(#grad-chest)" },
    { id: "stomach", label: "Stomach/Digestive", path: "M8 17h8v3c0 1-1 2-4 2s-4-1-4-2v-3z", color: "url(#grad-stomach)" },
    { id: "left_arm", label: "Left Arm", path: "M4 11l3 0v6l-3-1v-5z", color: "url(#grad-limbs)" },
    { id: "right_arm", label: "Right Arm", path: "M17 11l3 0v6l-3-1v-5z", color: "url(#grad-limbs)" },
    { id: "left_leg", label: "Left Leg", path: "M8 22l1 6h2l-1-6z", color: "url(#grad-limbs)" },
    { id: "right_leg", label: "Right Leg", path: "M13 22l1 6h2l-1-6z", color: "url(#grad-limbs)" },
  ];

  return (
    <div className="relative w-full aspect-[2/3] max-w-[220px] mx-auto glass-card-premium p-6 overflow-hidden">
      <defs>
        <linearGradient id="grad-head" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#89E900" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="grad-chest" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="grad-stomach" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="grad-limbs" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      <p className="text-[10px] font-black text-lime-500 uppercase tracking-[0.3em] text-center mb-6 animate-pulse">Neural Scan Active</p>
      
      <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-[0_0_15px_rgba(137,233,0,0.2)]">
        {parts.map((part) => (
          <motion.path
            key={part.id}
            d={part.path}
            whileHover={{ 
              scale: 1.05, 
              fillOpacity: 1,
              stroke: "#89E900",
              strokeWidth: 0.5
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectPart(part.label)}
            className="cursor-pointer transition-all duration-300"
            style={{ fill: part.color, stroke: "rgba(255,255,255,0.1)", strokeWidth: 0.2 }}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}
      </svg>
      
      {/* Decorative scanning line */}
      <motion.div 
        className="absolute left-0 w-full h-[1px] bg-lime-500/30 z-10"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

