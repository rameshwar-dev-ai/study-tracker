import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { Gift, Edit3, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RewardSection: React.FC = () => {
  const { stats, setRewardToday } = useStudy();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(stats.rewardToday || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setRewardToday(inputValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="card-base flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="label-caps mb-0 text-[10px]">Today's Reward</span>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-primary hover:text-indigo-700 transition-colors p-1"
        >
          {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.form
              key="edit"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <textarea
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What's your reward? (e.g., 15 mins of gaming, a chocolate...)"
                className="w-full text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors resize-none h-20"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
              >
                Set Reward
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              onClick={() => setIsEditing(true)}
              className="group cursor-pointer flex flex-col items-center text-center p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800 hover:border-primary/50 transition-all"
            >
              <div className="bg-white dark:bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Gift className={`w-5 h-5 ${stats.rewardToday ? 'text-primary' : 'text-slate-300'}`} />
              </div>
              {stats.rewardToday ? (
                <p className="text-xs font-bold text-slate-700 dark:text-zinc-200 leading-relaxed italic">
                  "{stats.rewardToday}"
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">No reward set</p>
                  <p className="text-[9px] text-slate-400 font-medium">Click to set a motivation</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {!isEditing && stats.rewardToday && (
        <p className="text-[9px] text-center text-slate-400 mt-4 font-medium uppercase tracking-widest">
          Available after your goal is met 🏆
        </p>
      )}
    </div>
  );
};
