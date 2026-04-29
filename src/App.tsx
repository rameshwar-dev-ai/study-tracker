/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudyProvider } from './context/StudyContext';
import { Navbar } from './components/Navbar';
import { DashboardProgress } from './components/Dashboard';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { PremiumBanner, AIPlannerLocked, SmartAnalyticsLocked } from './components/PremiumSection';
import { Leaderboard } from './components/Leaderboard';
import { RewardSection } from './components/RewardSection';
import { motion } from 'motion/react';

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export default function App() {
  return (
    <StudyProvider>
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-zinc-950 flex flex-col font-sans selection:bg-primary/20">
        <Navbar />
        
        <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
          
          {/* Left Column: Sidebar Stats & Tasks */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <FadeInSection delay={0.1}>
              <DashboardProgress />
            </FadeInSection>
            
            <FadeInSection delay={0.2} className="flex-1 min-h-[400px] flex flex-col">
              <TaskList />
            </FadeInSection>
          </div>

          {/* Center Column: Timer & Premium Tools */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <FadeInSection delay={0.3}>
              <Timer />
            </FadeInSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              <FadeInSection delay={0.4} className="flex">
                <AIPlannerLocked />
              </FadeInSection>
              <FadeInSection delay={0.5} className="flex">
                <SmartAnalyticsLocked />
              </FadeInSection>
            </div>
          </div>

          {/* Right Column: Upgrade & Social */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <FadeInSection delay={0.6}>
              <PremiumBanner />
            </FadeInSection>
            
            <FadeInSection delay={0.7} className="flex-1 flex flex-col">
              <Leaderboard />
            </FadeInSection>

            <FadeInSection delay={0.8}>
              <RewardSection />
            </FadeInSection>
          </div>
        </main>

        <footer className="h-12 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-zinc-500">
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Guide</a>
            <a href="#" className="hover:text-primary transition-colors">Settings</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
          <div className="italic hidden sm:block">
            "The expert in anything was once a beginner."
          </div>
          <div className="sm:hidden">
            FocusFlow v1.0
          </div>
        </footer>
      </div>
    </StudyProvider>
  );
}


