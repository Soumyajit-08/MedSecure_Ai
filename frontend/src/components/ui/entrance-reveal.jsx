"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A premium entrance reveal animation that plays when the site first loads.
 */
export function EntranceReveal() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the reveal after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#222222]"
        >
          {/* Background Mesh for Intro */}
          <div className="absolute inset-0 mesh-bg opacity-40" />
          
          <div className="relative flex flex-col items-center">
            {/* Pulsing Logo Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                opacity: 1,
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                times: [0, 0.6, 1]
              }}
              className="relative h-32 w-32 mb-8"
            >
              <div className="absolute inset-0 bg-lime-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <img 
                src="/icon.svg" 
                alt="Logo" 
                className="relative z-10 h-full w-full drop-shadow-[0_0_15px_rgba(137,233,0,0.5)]" 
              />
            </motion.div>

            {/* Text Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="text-3xl font-bold tracking-[0.3em] text-white uppercase"
              >
                MedSecure AI
              </motion.h1>
            </div>

            {/* Progress line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-lime-500 to-transparent mt-4 w-48 opacity-50"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-4 text-xs text-slate-500 uppercase tracking-widest"
            >
              Securing Patient Privacy
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
