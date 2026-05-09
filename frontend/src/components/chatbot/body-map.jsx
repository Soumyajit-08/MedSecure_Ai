"use client";

import { motion } from "framer-motion";

export function BodyMap({ onSelectPart }) {
  const parts = [
    { id: "head", label: "Head/Brain", path: "M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v.5h-4v-.5c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z", color: "from-blue-400 to-indigo-500" },
    { id: "chest", label: "Chest/Heart", path: "M8 11h8v5c0 1-1 2-4 2s-4-1-4-2v-5z", color: "from-red-400 to-rose-500" },
    { id: "stomach", label: "Stomach/Digestive", path: "M8 17h8v3c0 1-1 2-4 2s-4-1-4-2v-3z", color: "from-amber-400 to-orange-500" },
    { id: "left_arm", label: "Left Arm", path: "M4 11l3 0v6l-3-1v-5z", color: "from-slate-400 to-slate-500" },
    { id: "right_arm", label: "Right Arm", path: "M17 11l3 0v6l-3-1v-5z", color: "from-slate-400 to-slate-500" },
    { id: "left_leg", label: "Left Leg", path: "M8 22l1 6h2l-1-6z", color: "from-slate-500 to-slate-600" },
    { id: "right_leg", label: "Right Leg", path: "M13 22l1 6h2l-1-6z", color: "from-slate-500 to-slate-600" },
  ];

  return (
    <div className="relative w-full aspect-[2/3] max-w-[200px] mx-auto bg-white/[0.02] rounded-3xl p-4 border border-white/5">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center mb-4">Click to select area</p>
      <svg viewBox="0 0 24 32" className="w-full h-full">
        {parts.map((part) => (
          <motion.path
            key={part.id}
            d={part.path}
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectPart(part.label)}
            className={`cursor-pointer fill-white/10 stroke-white/20 hover:fill-lime-500/40 hover:stroke-lime-400 transition-all`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ))}
      </svg>
    </div>
  );
}
