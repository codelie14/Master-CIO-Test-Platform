import React, { useState } from 'react';
import { TestSession, TestConfig, Question } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TestConfiguration } from './components/TestConfiguration';
import { TestInterface } from './components/TestInterface';
import { TestResults } from './components/TestResults';
import { questions, shuffleArray } from './data/questions';
import { clearSession, clearConfig, clearServerTime, saveConfig, loadConfig } from './utils/storage';

type AppState = 'welcome' | 'config' | 'test' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [completedSession, setCompletedSession] = useState<TestSession | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);

  const handleStartTest = () => {
    setAppState('config');
  };

  const handleConfigComplete = (config: TestConfig, generatedQuestions?: any[]) => {
    setTestConfig(config);
    saveConfig(config);
    
    if (generatedQuestions && generatedQuestions.length > 0) {
      // Utiliser les questions générées par IA
      setCurrentQuestions(shuffleArray(generatedQuestions));
    } else {
      // Utiliser les questions par défaut, limitées au nombre demandé
      const selectedQuestions = shuffleArray(questions).slice(0, config.questionCount);
      setCurrentQuestions(selectedQuestions);
    }
    
    setAppState('test');
  };

  const handleTestComplete = (session: TestSession) => {
    setCompletedSession(session);
    setAppState('results');
  };

  const handleRestart = () => {
    clearSession();
    clearServerTime();
    setCompletedSession(null);
    setCurrentQuestions([]);
    setTestConfig(null);
    setAppState('config');
  };

  const handleBackToWelcome = () => {
    clearSession();
    clearConfig();
    clearServerTime();
    setCompletedSession(null);
    setCurrentQuestions([]);
    setTestConfig(null);
    setAppState('welcome');
  };

  switch (appState) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStartTest} />;
    
    case 'config':
      return <TestConfiguration onConfigComplete={handleConfigComplete} />;
    
    case 'test':
      return testConfig && currentQuestions.length > 0 ? (
        <TestInterface
          questions={currentQuestions}
          config={testConfig}
          onComplete={handleTestComplete}
        />
      ) : null;
    
    case 'results':
      return completedSession ? (
        <TestResults
          session={completedSession}
          questions={currentQuestions}
          onRestart={handleRestart}
        />
      ) : null;

    default:
      return null;
  }
}

export default App;