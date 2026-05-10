"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A smooth top progress bar that activates during route changes.
 */
export function PageProgress() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Start loading
    setVisible(true);
    setProgress(30);

    const timer1 = setTimeout(() => setProgress(60), 200);
    const timer2 = setTimeout(() => setProgress(85), 500);

    // End loading when route/params change
    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(finish);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div 
      className="page-loader-bar" 
      style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }} 
    />
  );
}
