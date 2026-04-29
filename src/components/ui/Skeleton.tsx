import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "bg-zinc-200 dark:bg-zinc-800 rounded-md relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 animate-shimmer" />
    </div>
  );
};
