"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MessageSquare, FileText, Shield, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Analyzer", href: "/prescription-analyzer", icon: FileText },
  { label: "Chatbot", href: "/chatbot", icon: MessageSquare },
  { label: "Profile", href: "/dashboard", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 md:hidden">
      <nav className="flex items-center justify-between w-full max-w-[400px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[28px] px-4 h-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1.5 flex-1 transition-all"
            >
              <div className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${isActive ? "bg-lime-500/20 text-lime-400" : "text-slate-500"}`}>
                <item.icon className={`h-6 w-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]" : ""}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? "text-lime-400" : "text-slate-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
