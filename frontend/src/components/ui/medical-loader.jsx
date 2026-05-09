"use client";

import React from "react";
import { motion } from "framer-motion";

export function MedicalLoader({ text = "Analysing Health Data..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12">
      <div className="relative">
        {/* DNA Helix / Pulse Container */}
        <div className="relative h-24 w-48">
          <svg
            viewBox="0 0 200 100"
            className="h-full w-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Grid Lines */}
            <path d="M0 50 L200 50" stroke="rgba(137, 233, 0, 0.05)" strokeWidth="1" />
            <path d="M50 0 L50 100" stroke="rgba(137, 233, 0, 0.05)" strokeWidth="1" />
            <path d="M100 0 L100 100" stroke="rgba(137, 233, 0, 0.05)" strokeWidth="1" />
            <path d="M150 0 L150 100" stroke="rgba(137, 233, 0, 0.05)" strokeWidth="1" />

            {/* Heartbeat Path */}
            <motion.path
              d="M0,50 L40,50 L50,20 L65,80 L75,50 L110,50 L120,10 L135,90 L145,50 L200,50"
              stroke="#89E900"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ 
                pathLength: [0, 1, 1],
                pathOffset: [0, 0, 1],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Glowing Dot at the tip */}
            <motion.circle
              r="4"
              fill="#89E900"
              animate={{
                cx: [0, 200],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <animate attributeName="filter" values="none; drop-shadow(0 0 8px #89E900); none" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        </div>

        {/* Outer Circular Pulse */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-500/30"
          initial={{ width: 40, height: 40, opacity: 0.8 }}
          animate={{ width: 180, height: 180, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-500/20"
          initial={{ width: 40, height: 40, opacity: 0.5 }}
          animate={{ width: 220, height: 220, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      <div className="text-center space-y-2">
        <motion.h3 
          className="text-lg font-bold tracking-widest text-white uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.h3>
        <p className="text-xs text-slate-500 font-medium tracking-[0.3em] uppercase">
          Securing Medical Records...
        </p>
      </div>
    </div>
  );
}
