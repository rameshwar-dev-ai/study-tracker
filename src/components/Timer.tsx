import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';
import { Toast } from './ui/Toast';

const TIMER_MODES = {
  FOCUS: { label: 'Focus', time: 25 * 60, color: 'text-primary' },
  BREAK: { label: 'Break', time: 5 * 60, color: 'text-green-500' },
};

export const Timer: React.FC = () => {
  const { addSession } = useStudy();
  const [mode, setMode] = useState<keyof typeof TIMER_MODES>('FOCUS');
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.FOCUS.time);
  const [isActive, setIsActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = ((TIMER_MODES[mode].time - timeLeft) / TIMER_MODES[mode].time) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (mode === 'FOCUS') {
      const durationMin = Math.floor(TIMER_MODES.FOCUS.time / 60);
      addSession(durationMin);
      setToastMsg(`Great job! Session complete. 🔥`);
      setShowToast(true);
      setMode('BREAK');
      setTimeLeft(TIMER_MODES.BREAK.time);
    } else {
      setToastMsg('Break over!');
      setShowToast(true);
      setMode('FOCUS');
      setTimeLeft(TIMER_MODES.FOCUS.time);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIMER_MODES[mode].time);
  };

  const switchMode = (newMode: keyof typeof TIMER_MODES) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(TIMER_MODES[newMode].time);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col items-center justify-center relative overflow-hidden h-[400px]">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500 opacity-5 rounded-full" />
      
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-full mb-8 z-10 w-48">
        {(Object.keys(TIMER_MODES) as Array<keyof typeof TIMER_MODES>).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              mode === m 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-slate-900 dark:text-zinc-100' 
                : 'text-slate-400'
            }`}
          >
            {TIMER_MODES[m].label}
          </button>
        ))}
      </div>

      <div className="relative w-56 h-56 mb-8">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            className="text-slate-100 dark:text-zinc-800"
          />
          <motion.circle
            cx="112"
            cy="112"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            strokeLinecap="round"
            className={`progress-ring__circle ${TIMER_MODES[mode].color} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-slate-800 dark:text-zinc-100 tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
            Focus Session
          </span>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <button
          onClick={toggleTimer}
          className="px-10 py-3.5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 outline-none hover:scale-[1.02] transition-transform active:scale-95"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3.5 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <Toast message={toastMsg} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};
