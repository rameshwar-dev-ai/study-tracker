import React from 'react';

const TOP_STUDENTS = [
  { rank: 1, name: 'Sarah Miller', time: '18h studied', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { rank: 2, name: 'James Chen', time: '16.5h studied', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { rank: 3, name: 'Emily Watts', time: '14h studied', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
];

export const Leaderboard: React.FC = () => {
  return (
    <div className="card-base flex-1 overflow-hidden flex flex-col">
      <span className="label-caps">Leaderboard</span>
      <div className="space-y-4 flex-1">
        {TOP_STUDENTS.map((student) => (
          <div key={student.rank} className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 w-4">{student.rank}</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 overflow-hidden">
               <img src={student.avatar} alt={student.name} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate dark:text-zinc-200">{student.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{student.time}</div>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 p-2 bg-indigo-50 dark:bg-primary/10 border border-indigo-100 dark:border-primary/20 rounded-xl mt-2">
          <span className="text-xs font-bold text-primary w-4">42</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold text-primary truncate">You (Alex)</div>
            <div className="text-[10px] text-indigo-400 dark:text-indigo-300 truncate">4h studied</div>
          </div>
        </div>
      </div>
    </div>
  );
};
