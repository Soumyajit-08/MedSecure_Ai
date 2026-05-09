"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * A premium card component with a 3D tilt effect on hover.
 */
export function MotionCard({ children, className = "" }) {
  const ref = useRef(null);
  
  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10"
      >
        {children}
      </div>
      
      {/* Shine effect */}
      <motion.div
        style={{
          opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.15]),
          background: "radial-gradient(circle at center, rgba(6, 78, 59, 0.45), transparent)",
          transform: "translateZ(1px)",
        }}
        className="absolute inset-0 pointer-events-none group-hover:block hidden"
      />
    </motion.div>
  );
}

/**
 * A floating 3D background element
 */
export function FloatingElement({ children, delay = 0, duration = 5, className = "" }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
