"use client";

import { useEffect } from "react";

export function CursorSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="mesh-bg" aria-hidden="true" />;
}
