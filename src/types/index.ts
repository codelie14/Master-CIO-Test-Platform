export interface Question {
  id: number;
  type: 'mcq' | 'calculation' | 'open';
  question: string;
  category: string;
  options?: string[];
  correct?: number;
  answer?: number;
  tolerance?: number;
  unit?: string;
  formula?: string;
  maxWords?: number;
}

export interface TestSession {
  startTime: number;
  answers: Record<number, string | number>;
  timeSpent: number;
  markedQuestions: number[];
  currentQuestion: number;
  isCompleted: boolean;
}

export interface QuestionState {
  status: 'unanswered' | 'answered' | 'marked' | 'current';
  answer?: string | number;
}

export interface TestResults {
  totalScore: number;
  mcqScore: number;
  calculationScore: number;
  openScore: number;
  timeSpent: number;
  completionRate: number;
  categoryScores: Record<string, number>;
}

export interface TestConfig {
  duration: number; // en minutes
  questionCount: number;
  questionTypes: {
    mcq: number; // pourcentage
    calculation: number; // pourcentage
    open: number; // pourcentage
  };
  useAIGeneration: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ServerTimeResponse {
  serverTime: number;
  sessionStartTime: number;
  timeElapsed: number;
}