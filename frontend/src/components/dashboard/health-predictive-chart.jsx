"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', current: 65, predicted: 65 },
  { name: 'Feb', current: 70, predicted: 70 },
  { name: 'Mar', current: 68, predicted: 68 },
  { name: 'Apr', current: 75, predicted: 75 },
  { name: 'May', current: 80, predicted: 80 },
  { name: 'Jun', predicted: 85 },
  { name: 'Jul', predicted: 88 },
];

export const HealthPredictiveChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-premium p-8 h-[400px] w-full relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white">AI Health Prediction</h3>
          <p className="text-xs text-slate-400">Projected wellness index based on clinical data</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-lime-500" />
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full border border-dashed border-cyan-400" />
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">AI Projected</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#89E900" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#89E900" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.2)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.5)' }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 10, 0.9)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '16px',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
          />
          <Area 
            type="monotone" 
            dataKey="current" 
            stroke="#89E900" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorActual)" 
            animationDuration={2000}
          />
          <Area 
            type="monotone" 
            dataKey="predicted" 
            stroke="#00f2fe" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            fillOpacity={1} 
            fill="url(#colorPredicted)" 
            animationDuration={3000}
          />
          <ReferenceLine x="May" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" label={{ position: 'top', value: 'Present', fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-lime-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 h-64 w-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
    </motion.div>
  );
};
