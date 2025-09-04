import React, { useState, useEffect } from 'react';
import { Question, TestSession, QuestionState, TestConfig } from '../types';
import { Timer } from './Timer';
import { QuestionNavigator } from './QuestionNavigator';
import { QuestionDisplay } from './QuestionDisplay';
import { Calculator } from './Calculator';
import { ProgressBar } from './ProgressBar';
import { saveSession, loadSession, createNewSession, saveServerTime } from '../utils/storage';
import { ChevronLeft, ChevronRight, Save, AlertTriangle } from 'lucide-react';

interface TestInterfaceProps {
  questions: Question[];
  config: TestConfig;
  onComplete: (session: TestSession) => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({ questions, config, onComplete }) => {
  const [session, setSession] = useState<TestSession>(() => {
    const saved = loadSession();
    if (saved) {
      return saved;
    }
    // Nouveau test - créer une session avec timestamp sécurisé
    const startTime = Date.now();
    saveServerTime(startTime);
    return createNewSession(startTime);
  });
  
  const [showCalculator, setShowCalculator] = useState(false);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [isTimerInvalid, setIsTimerInvalid] = useState(false);

  // Auto-save session on changes
  useEffect(() => {
    saveSession(session);
  }, [session]);

  const updateAnswer = (questionIndex: number, answer: string | number) => {
    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionIndex]: answer
      }
    }));
  };

  const toggleMarkQuestion = (questionIndex: number) => {
    setSession(prev => ({
      ...prev,
      markedQuestions: prev.markedQuestions.includes(questionIndex)
        ? prev.markedQuestions.filter(q => q !== questionIndex)
        : [...prev.markedQuestions, questionIndex]
    }));
  };

  const navigateToQuestion = (index: number) => {
    setSession(prev => ({ ...prev, currentQuestion: index }));
  };

  const handleNext = () => {
    if (session.currentQuestion < questions.length - 1) {
      navigateToQuestion(session.currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (session.currentQuestion > 0) {
      navigateToQuestion(session.currentQuestion - 1);
    }
  };

  const handleTimeUp = () => {
    setSession(prev => ({ ...prev, isCompleted: true }));
    onComplete(session);
  };

  const handleTenMinutesLeft = () => {
    setShowTimeAlert(true);
    setTimeout(() => setShowTimeAlert(false), 5000);
  };

  const handleTimerInvalid = () => {
    setIsTimerInvalid(true);
    alert('Tentative de manipulation du timer détectée. Le test va se terminer automatiquement.');
    setTimeout(() => {
      setSession(prev => ({ ...prev, isCompleted: true }));
      onComplete(session);
    }, 3000);
  };

  const handleFinishTest = () => {
    if (confirm('Êtes-vous sûr de vouloir terminer le test ? Cette action est irréversible.')) {
      setSession(prev => ({ ...prev, isCompleted: true }));
      onComplete(session);
    }
  };

  const getQuestionStates = (): Record<number, QuestionState> => {
    const states: Record<number, QuestionState> = {};
    
    questions.forEach((_, index) => {
      const hasAnswer = session.answers[index] !== undefined;
      const isMarked = session.markedQuestions.includes(index);
      const isCurrent = index === session.currentQuestion;

      states[index] = {
        status: isMarked ? 'marked' : isCurrent ? 'current' : hasAnswer ? 'answered' : 'unanswered',
        answer: session.answers[index]
      };
    });

    return states;
  };

  const questionStates = getQuestionStates();
  const answeredCount = Object.keys(session.answers).length;
  const currentQuestion = questions[session.currentQuestion];

  if (isTimerInvalid) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Test Invalidé</h2>
          <p className="text-gray-600 mb-4">
            Une tentative de manipulation du timer a été détectée. 
            Le test se termine automatiquement.
          </p>
          <div className="animate-pulse text-red-600">
            Fermeture en cours...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-800">Master CIO - Examen</h1>
            <Timer
              duration={config.duration}
              startTime={session.startTime}
              onTimeUp={handleTimeUp}
              onTenMinutesLeft={handleTenMinutesLeft}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => saveSession(session)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>
            <button
              onClick={handleFinishTest}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              Terminer le Test
            </button>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar
            current={session.currentQuestion}
            total={questions.length}
            answered={answeredCount}
          />
        </div>
      </header>

      {/* Time Alert */}
      {showTimeAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mx-6 mt-4 rounded">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <p className="text-yellow-800 font-medium">
              Attention : Il vous reste 10 minutes pour terminer le test !
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 p-6">
          <QuestionNavigator
            questions={questions}
            currentQuestion={session.currentQuestion}
            questionStates={questionStates}
            onQuestionSelect={navigateToQuestion}
          />
        </aside>

        {/* Main Question Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <QuestionDisplay
            question={currentQuestion}
            answer={session.answers[session.currentQuestion]}
            onAnswerChange={(answer) => updateAnswer(session.currentQuestion, answer)}
            onToggleMark={() => toggleMarkQuestion(session.currentQuestion)}
            isMarked={session.markedQuestions.includes(session.currentQuestion)}
            onOpenCalculator={() => setShowCalculator(true)}
          />
        </main>
      </div>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={session.currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Question <span className="font-semibold">{session.currentQuestion + 1}</span> sur{' '}
              <span className="font-semibold">{questions.length}</span>
            </p>
          </div>

          <button
            onClick={handleNext}
            disabled={session.currentQuestion === questions.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Calculator Modal */}
      <Calculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </div>
  );
};