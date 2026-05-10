"use client";

import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: "en", label: "English" },
    { code: "bn", label: "বাংলা" },
    { code: "hi", label: "हिन्दी" },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-slate-400 hover:text-lime-400 text-[10px] font-black uppercase tracking-widest"
      >
        <Languages size={14} />
        <span className="hidden sm:inline">{mounted ? currentLang.code.toUpperCase() : "EN"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-12 w-32 glass-card p-2 border-white/10 shadow-3xl z-50 overflow-hidden pointer-events-auto"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                  i18n.language === lang.code
                    ? "bg-lime-500/20 text-lime-400 font-bold"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
