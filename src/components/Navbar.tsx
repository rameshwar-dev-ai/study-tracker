import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Moon, Sun, Flame, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, stats } = useStudy();

  return (
    <nav className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white fill-current" />
        </div>
        <span className="font-bold text-xl tracking-tight dark:text-white">FocusFlow</span>
      </div>

      <div className="flex items-center gap-4">
        {stats.streak > 0 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/20 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/30"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-current" />
            <span className="font-bold text-orange-700 dark:text-orange-400 text-sm">{stats.streak} Day Streak</span>
          </motion.div>
        )}

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>
    </nav>
  );
};
