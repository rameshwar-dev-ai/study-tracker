import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, Session, UserStats, Theme, StudyContextType } from '../types';
import { format, isToday, isYesterday, parseISO, startOfDay } from 'date-fns';

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<UserStats>({
    streak: 0,
    totalTimeToday: 0,
    dailyGoal: 60,
    lastSessionDate: null,
    rewardToday: null,
  });
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('ff_tasks');
    const savedSessions = localStorage.getItem('ff_sessions');
    const savedStats = localStorage.getItem('ff_stats');
    const savedTheme = localStorage.getItem('ff_theme') as Theme;

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedTheme) setTheme(savedTheme);

    setIsLoading(false);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('ff_tasks', JSON.stringify(tasks));
      localStorage.setItem('ff_sessions', JSON.stringify(sessions));
      localStorage.setItem('ff_stats', JSON.stringify(stats));
      localStorage.setItem('ff_theme', theme);
    }
  }, [tasks, sessions, stats, theme, isLoading]);

  // Task overrides
  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Session & Streak Logic
  const addSession = (duration: number) => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      duration,
      timestamp: Date.now(),
    };
    
    setSessions((prev) => [...prev, newSession]);

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    
    setStats((prev) => {
      let newStreak = prev.streak;
      const lastDate = prev.lastSessionDate;

      if (!lastDate) {
        newStreak = 1;
      } else {
        const lastSessionParsed = parseISO(lastDate);
        if (isYesterday(lastSessionParsed)) {
          newStreak += 1;
        } else if (!isToday(lastSessionParsed)) {
          newStreak = 1;
        }
        // If it's already today, streak stays the same
      }

      return {
        ...prev,
        streak: newStreak,
        totalTimeToday: prev.totalTimeToday + duration,
        lastSessionDate: todayStr,
      };
    });
  };

  const setDailyGoal = (goal: number) => {
    setStats((prev) => ({ ...prev, dailyGoal: goal }));
  };

  const setRewardToday = (reward: string) => {
    setStats((prev) => ({ ...prev, rewardToday: reward }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Reset daily stats if it's a new day
  useEffect(() => {
    const checkNewDay = () => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const savedDate = localStorage.getItem('ff_last_check_date');

      if (savedDate && savedDate !== todayStr) {
        // It's a new day!
        setStats((prev) => {
          let updatedStreak = prev.streak;
          const lastSessionParsed = prev.lastSessionDate ? parseISO(prev.lastSessionDate) : null;
          
          // If they didn't study yesterday, reset streak
          if (!lastSessionParsed || (!isToday(lastSessionParsed) && !isYesterday(lastSessionParsed))) {
            updatedStreak = 0;
          }

          return {
            ...prev,
            totalTimeToday: 0,
            streak: updatedStreak,
            rewardToday: null,
          };
        });
      }
      localStorage.setItem('ff_last_check_date', todayStr);
    };

    checkNewDay();
    const interval = setInterval(checkNewDay, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <StudyContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        sessions,
        addSession,
        stats,
        setDailyGoal,
        setRewardToday,
        theme,
        toggleTheme,
        isLoading,
      }}
    >
      <div className={theme}>
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
          {children}
        </div>
      </div>
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
