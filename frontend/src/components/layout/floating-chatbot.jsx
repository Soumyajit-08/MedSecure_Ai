"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingChatbot() {
  const pathname = usePathname();

  // Hide the floating button if we are already on the chatbot page
  if (pathname === "/chatbot") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <Link href="/chatbot">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-14 w-14 rounded-full bg-gradient-to-tr from-lime-600 via-emerald-600 to-teal-500 p-[2px] shadow-2xl shadow-lime-900/40 relative group"
        >
          <div className="h-full w-full rounded-full bg-[#111] flex items-center justify-center transition-colors group-hover:bg-transparent">
            <div className="relative">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-lime-500 rounded-full border-2 border-[#111] animate-pulse" />
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
            Chat with AI
          </div>
        </motion.button>
      </Link>
    </div>
  );
}
