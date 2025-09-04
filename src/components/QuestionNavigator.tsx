import React from 'react';
import { Question, QuestionState } from '../types';
import { CheckCircle, Clock, AlertCircle, Star } from 'lucide-react';

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestion: number;
  questionStates: Record<number, QuestionState>;
  onQuestionSelect: (index: number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  currentQuestion,
  questionStates,
  onQuestionSelect
}) => {
  const getQuestionIcon = (index: number) => {
    const state = questionStates[index];
    
    if (state?.status === 'marked') {
      return <Star className="w-4 h-4 fill-current" />;
    }
    
    switch (state?.status) {
      case 'answered':
        return <CheckCircle className="w-4 h-4" />;
      case 'current':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getQuestionColor = (index: number) => {
    const state = questionStates[index];
    
    if (state?.status === 'marked') {
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
    
    if (index === currentQuestion) {
      return 'bg-blue-500 text-white border-blue-500';
    }

    switch (state?.status) {
      case 'answered':
        return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200';
    }
  };

  const groupedQuestions = questions.reduce((acc, question, index) => {
    const category = question.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push({ question, index });
    return acc;
  }, {} as Record<string, Array<{ question: Question; index: number }>>);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
      
      {Object.entries(groupedQuestions).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
            {category}
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {items.map(({ index }) => (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`
                  relative p-2 rounded-lg border-2 font-medium text-sm transition-all duration-200 
                  flex items-center justify-center space-x-1
                  ${getQuestionColor(index)}
                `}
              >
                <span>{index + 1}</span>
                <div className="absolute -top-1 -right-1">
                  {getQuestionIcon(index)}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Répondue</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>En cours</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-gray-600" />
            <span>Non répondue</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-600 fill-current" />
            <span>Marquée</span>
          </div>
        </div>
      </div>
    </div>
  );
};