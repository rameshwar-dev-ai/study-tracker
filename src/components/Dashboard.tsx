import React from 'react';
import { useStudy } from '../context/StudyContext';
import { motion } from 'motion/react';
import { Trophy, Target, Clock, ArrowRight } from 'lucide-react';

export const DashboardProgress: React.FC = () => {
  const { stats } = useStudy();
  
  const progress = Math.min((stats.totalTimeToday / stats.dailyGoal) * 100, 100);

  return (
    <div className="card-base">
      <span className="label-caps">Daily Progress</span>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-sm mb-1 font-medium">
            <span className="text-slate-600 dark:text-zinc-400">Study Goal</span>
            <span className="font-bold dark:text-zinc-200">{Math.round(stats.totalTimeToday / 60 * 10) / 10}h / {Math.round(stats.dailyGoal / 60 * 10) / 10}h</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full transition-all"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Today</div>
            <div className="text-lg font-bold text-primary">{stats.totalTimeToday}m</div>
          </div>
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Rank</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">#42</div>
          </div>
        </div>
      </div>
    </div>
  );
};
