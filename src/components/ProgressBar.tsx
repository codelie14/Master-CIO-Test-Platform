import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  answered: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, answered }) => {
  const progressPercentage = ((current + 1) / total) * 100;
  const completionPercentage = (answered / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Question {current + 1} sur {total}</span>
        <span>{answered} répondues ({Math.round(completionPercentage)}%)</span>
      </div>
      
      <div className="relative">
        {/* Background bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          {/* Completion bar */}
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
          {/* Current position indicator */}
          <div 
            className="absolute top-0 w-1 bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ left: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};