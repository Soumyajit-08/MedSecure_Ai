"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Award, TrendingUp } from 'lucide-react';

export const HealthStreaks = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const activeDays = [1, 2, 3, 4];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card-premium p-6 border-white/5 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-white">4 Day Streak</h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Personal Best: 12 days</p>
          </div>
        </div>
        <Award className="h-6 w-6 text-lime-400 opacity-50" />
      </div>

      <div className="flex justify-between items-center px-2">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
              activeDays.includes(idx) 
              ? "bg-lime-500 text-black shadow-[0_0_15px_rgba(137,233,0,0.4)]" 
              : "bg-white/5 text-slate-500 border border-white/10"
            }`}>
              {activeDays.includes(idx) ? <CheckCircle2 className="h-4 w-4" /> : day}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Monthly Progress</span>
          <span className="text-xs font-bold text-lime-400">72%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-lime-600 to-emerald-400 shadow-[0_0_10px_rgba(137,233,0,0.3)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <TrendingUp className="h-3 w-3 text-emerald-400" />
        <span>+12% healthier than last month</span>
      </div>
    </motion.div>
  );
};
