"use client";

import { MedicalLoader } from "./medical-loader";

/**
 * A premium smooth loader component for MedSecure AI.
 * Can be used as a full-page overlay or an inline spinner.
 */
export function SmoothLoader({ fullPage = false, size = "md", text = "Analysing Health Data..." }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-[6px]"
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
      <div className={`modern-spinner ${sizeClasses[size] || sizeClasses.md}`} />
      {text && (
        <p className="shimmer-text text-sm font-medium tracking-widest uppercase">
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-2xl">
        <div className="absolute inset-0 mesh-bg opacity-40" />
        <MedicalLoader text={text} />
      </div>
    );
  }

  return loaderContent;
}

/**
 * Skeleton placeholder components for smooth content loading
 */
export const Skeleton = {
  Circle: ({ size = "w-12 h-12", className = "" }) => (
    <div className={`${size} rounded-full skeleton-pulse ${className}`} />
  ),
  Rectangle: ({ height = "h-4", width = "w-full", className = "" }) => (
    <div className={`${width} ${height} rounded-lg skeleton-pulse ${className}`} />
  ),
  Card: ({ className = "" }) => (
    <div className={`glass-card p-6 space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        <Skeleton.Circle size="w-10 h-10" />
        <div className="space-y-2 flex-grow">
          <Skeleton.Rectangle width="w-1/3" />
          <Skeleton.Rectangle width="w-1/4" height="h-3" />
        </div>
      </div>
      <Skeleton.Rectangle height="h-24" />
      <div className="flex gap-2">
        <Skeleton.Rectangle width="w-20" height="h-8" />
        <Skeleton.Rectangle width="w-20" height="h-8" />
      </div>
    </div>
  )
};
