"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { chatbotApi } from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LanguageToggle } from "./header-controls";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useClickOutside(() => setShowProfile(false));

  const { data: historyData } = useQuery({
    queryKey: ["header-chat-history"],
    queryFn: () => chatbotApi.getHistory(),
    enabled: !!user && showProfile,
    staleTime: 60000
  });

  const history = (historyData?.data?.data || [])
    .filter((item) => item?.role === "user" && item?.text)
    .slice(-5)
    .reverse();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSwitchAccount = () => {
    logout();
    router.push("/login?switch=true");
  };

  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation({
    mutationFn: (id) => chatbotApi.deleteHistoryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["header-chat-history"] });
      const firstName = user?.fullName?.split(" ")[0] || "Patient";
      toast.success(`${firstName}, the clinical record has been permanently removed.`);
    }
  });

  const clearHistoryMutation = useMutation({
    mutationFn: () => chatbotApi.clearHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["header-chat-history"] });
      const firstName = user?.fullName?.split(" ")[0] || "Patient";
      toast.success(`${firstName}, your consultation history has been cleared.`);
    }
  });

  const handleDeleteItem = (e, id) => {
    e.stopPropagation();
    deleteItemMutation.mutate(id);
  };

  const handleClearHistory = (e) => {
    e.stopPropagation();
    if (confirm("Permanently clear your clinical consultation history?")) {
      clearHistoryMutation.mutate();
    }
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 md:px-8 pointer-events-none">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 rounded-[24px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] pointer-events-auto">

        {/* Left Side: Back Button & Logo */}
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => router.back()}
            className="group flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-90"
            aria-label="Go back"
          >
            <svg 
              className="h-4 w-4 md:h-5 md:w-5 text-slate-300 group-hover:text-lime-400 transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-white group">
            <div className="h-9 w-9 md:h-11 md:w-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 transition-all group-hover:border-lime-500/50 group-hover:bg-lime-500/10">
              <img src="/icon.svg" alt="Logo" className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-500 group-hover:rotate-[360deg]" />
            </div>
            <span className="hidden sm:inline-block">MedSecure <span className="text-lime-400">AI</span></span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
            <LanguageToggle />
          </div>
          <div className="flex items-center gap-3 md:gap-8">
            {!loading && user ? (
              <div className="flex items-center gap-4 md:gap-7 relative pr-2">
                <div className="hidden md:flex items-center gap-6 mr-4 border-r border-white/10 pr-6">
                  <Link href="/chatbot" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-lime-400 transition-colors">
                    {t("nav.chatbot")}
                  </Link>
                  <Link href="/prescription-analyzer" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-lime-400 transition-colors">
                    {t("nav.analyzer")}
                  </Link>
                  <Link href="/dashboard" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-lime-400 transition-colors">
                    {t("nav.dashboard")}
                  </Link>
                </div>

                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className="h-10 w-10 rounded-full border border-lime-500/30 bg-lime-500/10 flex items-center justify-center text-lime-400 font-bold hover:bg-lime-500/20 transition-all relative overflow-hidden group shadow-lg shadow-lime-900/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-lime-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {user.fullName?.charAt(0) || "U"}
                  </button>

                  <AnimatePresence>
                    {showProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-14 w-64 glass-card p-4 border-white/10 shadow-3xl z-50 overflow-hidden pointer-events-auto"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 to-emerald-500" />
                        
                        <div className="mb-4 pb-4 border-b border-white/10">
                          <p className="text-sm font-bold text-white truncate">{user.fullName}</p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                        </div>

                        {/* Chat History */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2 px-1">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t("nav.recent_chats")}</p>
                            {history.length > 0 && (
                              <button 
                                onClick={handleClearHistory}
                                className="text-[9px] font-bold text-slate-600 hover:text-red-400 transition-colors uppercase tracking-tighter"
                              >
                                {t("nav.clear_all")}
                              </button>
                            )}
                          </div>
                          <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                            {history.length > 0 ? (
                              history.map((item, idx) => (
                                <div key={item._id || idx} className="flex items-center justify-between group/item">
                                  <button
                                    onClick={() => {
                                      router.push(`/chatbot?message=${encodeURIComponent(item.text)}`);
                                      setShowProfile(false);
                                    }}
                                    className="flex-grow text-left px-2 py-1.5 rounded-md text-xs text-slate-300 hover:bg-white/5 hover:text-lime-400 transition-all truncate"
                                  >
                                    {item.text}
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteItem(e, item._id)}
                                    className="opacity-0 group-hover/item:opacity-100 p-1.5 text-slate-500 hover:text-red-400 transition-all rounded-md hover:bg-red-500/10"
                                    title="Delete record"
                                  >
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-center py-4 text-[10px] text-slate-600 italic">{t("nav.no_recent_chats")}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <button 
                            onClick={handleSwitchAccount}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            {t("nav.switch_account")}
                          </button>
                          
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-lg transition-all mt-2"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {t("nav.logout")}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-6">
                <div className="hidden md:flex items-center gap-6 mr-2 border-r border-white/10 pr-6">
                  <Link href="/chatbot" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-lime-400 transition-colors">
                    {t("nav.chatbot")}
                  </Link>
                  <Link href="/prescription-analyzer" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-lime-400 transition-colors">
                    {t("nav.analyzer")}
                  </Link>
                </div>
                <Link href="/login" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors px-2">
                  {t("nav.login")}
                </Link>
                <Link href="/signup">
                  <button className="rounded-2xl bg-white px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black transition hover:bg-lime-400 shadow-xl shadow-lime-900/10 border-none">
                    {t("nav.join_now")}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
