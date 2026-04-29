import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Trash2, ListTodo } from 'lucide-react';
import { Toast } from './ui/Toast';

export const TaskList: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useStudy();
  const [inputValue, setInputValue] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
      setShowToast(true);
    }
  };

  return (
    <div className="card-base flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <span className="label-caps mb-0">To-Do Tasks</span>
        <button 
          onClick={() => {}} // Could trigger modal or focus input
          className="text-primary hover:text-indigo-700 font-bold text-xl leading-none"
        >
          +
        </button>
      </div>

      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Quick add..."
          className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </form>

      <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-40">
              <ListTodo className="w-8 h-8 mb-2" />
              <p className="text-[10px] uppercase font-bold tracking-widest text-center">No active tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all group ${
                  task.completed 
                    ? 'bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30 opacity-60' 
                    : 'bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-slate-300 dark:border-zinc-600'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                
                <span className={`text-sm flex-1 truncate ${
                  task.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-zinc-200'
                }`}>
                  {task.title}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-50 dark:border-zinc-800">
        <p className="text-[10px] text-center text-slate-400 font-medium">Stay consistent! ✨</p>
      </div>

      <Toast message="Task added!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};
