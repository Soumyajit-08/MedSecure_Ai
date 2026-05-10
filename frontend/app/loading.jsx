"use client";

import React from "react";
import { motion } from "framer-motion";
import { MedicalLoader } from "@/components/ui/medical-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(137,233,0,0.1),transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <MedicalLoader text="Initialising Secure Session..." />
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-lime-500"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
            MedSecure AI Platform v2.4
          </span>
        </div>
      </div>
    </div>
  );
}
