import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BarChart3, Bell, Maximize2, RefreshCw, Cloud, Lock } from 'lucide-react';

export const PremiumBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 dark:shadow-none">
      <h2 className="text-xl font-bold mb-2">Go Premium</h2>
      <p className="text-indigo-100 text-[10px] mb-6 leading-relaxed">Unlock AI planning, deep stats, and focus modes.</p>
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
          <span>Cloud Sync</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
          <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
          <span>Advanced Habits</span>
        </div>
      </div>
      <button className="w-full py-3 bg-white text-primary font-bold rounded-2xl shadow-sm text-sm active:translate-y-0.5 transition-transform">
        Upgrade — ₹99/mo
      </button>
    </div>
  );
};

export const AIPlannerLocked: React.FC = () => (
  <div className="card-base flex flex-col flex-1">
    <div className="flex items-center justify-between mb-4">
      <span className="label-caps mb-0 text-[10px]">AI Study Planner</span>
      <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded uppercase">PREMIUM</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/50 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl p-4">
      <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-2">
        <span className="text-lg">🪄</span>
      </div>
      <p className="text-[10px] text-slate-500 text-center px-4 leading-relaxed font-medium uppercase tracking-wider">Generate a custom roadmap based on your subjects</p>
      <button className="mt-3 text-[10px] font-bold text-purple-600 hover:underline underline-offset-4">Unlock Feature</button>
    </div>
  </div>
);

export const SmartAnalyticsLocked: React.FC = () => (
  <div className="card-base flex flex-col flex-1">
    <div className="flex items-center justify-between mb-4">
      <span className="label-caps mb-0 text-[10px]">Smart Analytics</span>
      <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded uppercase">PREMIUM</span>
    </div>
    <div className="space-y-3 opacity-30 pointer-events-none flex-1 flex flex-col justify-center">
      <div className="flex items-end gap-1 h-20">
        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 h-[40%] rounded-sm"></div>
        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 h-[60%] rounded-sm"></div>
        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 h-[90%] rounded-sm"></div>
        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 h-[50%] rounded-sm"></div>
        <div className="flex-1 bg-slate-200 dark:bg-zinc-800 h-[70%] rounded-sm"></div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-none">Weekly Growth</p>
    </div>
    <button className="mt-auto py-2 border border-purple-200 dark:border-purple-900/50 rounded-xl text-[10px] font-bold text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors uppercase tracking-widest">View Insights</button>
  </div>
);

export const PremiumSection: React.FC = () => null; // Not used in the new layout, but kept for imports if needed temporarily.

