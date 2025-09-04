import React from 'react';
import { Question } from '../types';
import { Calculator, Star } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  answer: string | number | undefined;
  onAnswerChange: (answer: string | number) => void;
  onToggleMark: () => void;
  isMarked: boolean;
  onOpenCalculator: () => void;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  answer,
  onAnswerChange,
  onToggleMark,
  isMarked,
  onOpenCalculator
}) => {
  const renderMCQ = () => (
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <label
          key={index}
          className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            answer === index
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={index}
            checked={answer === index}
            onChange={() => onAnswerChange(index)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  );

  const renderCalculation = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <input
          type="number"
          step="any"
          value={answer || ''}
          onChange={(e) => onAnswerChange(parseFloat(e.target.value) || 0)}
          placeholder="Votre réponse..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
        />
        {question.unit && (
          <span className="text-gray-600 font-medium">{question.unit}</span>
        )}
        <button
          onClick={onOpenCalculator}
          className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          title="Ouvrir la calculatrice"
        >
          <Calculator className="w-4 h-4" />
          <span>Calc</span>
        </button>
      </div>
      {question.formula && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Aide :</strong> {question.formula}
          </p>
        </div>
      )}
    </div>
  );

  const renderOpen = () => {
    const wordCount = answer ? answer.toString().split(/\s+/).filter(word => word.length > 0).length : 0;
    const maxWords = question.maxWords || 200;

    return (
      <div className="space-y-3">
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Votre réponse détaillée..."
          className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
          maxLength={maxWords * 7} // Approximation de caractères par mot
        />
        <div className="flex justify-between text-sm">
          <span className={`${wordCount > maxWords ? 'text-red-600' : 'text-gray-500'}`}>
            Mots : {wordCount}/{maxWords}
          </span>
          {wordCount > maxWords && (
            <span className="text-red-600">Limite dépassée !</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {question.category}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {question.type === 'mcq' ? 'QCM' : question.type === 'calculation' ? 'Calcul' : 'Ouverte'}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
            {question.question}
          </h2>
        </div>
        <button
          onClick={onToggleMark}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isMarked
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          title={isMarked ? 'Retirer le marquage' : 'Marquer pour révision'}
        >
          <Star className={`w-5 h-5 ${isMarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-6">
        {question.type === 'mcq' && renderMCQ()}
        {question.type === 'calculation' && renderCalculation()}
        {question.type === 'open' && renderOpen()}
      </div>
    </div>
  );
};