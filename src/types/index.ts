export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export interface Session {
  id: string;
  duration: number; // in minutes
  timestamp: number;
}

export interface UserStats {
  streak: number;
  totalTimeToday: number; // in minutes
  dailyGoal: number; // in minutes
  lastSessionDate: string | null; // ISO date string
  rewardToday: string | null;
}

export type Theme = 'light' | 'dark';

export interface StudyContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  sessions: Session[];
  addSession: (duration: number) => void;
  stats: UserStats;
  setDailyGoal: (goal: number) => void;
  setRewardToday: (reward: string) => void;
  theme: Theme;
  toggleTheme: () => void;
  isLoading: boolean;
}
