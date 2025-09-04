import { Question } from '../types';
import { generateQuestions, GeneratedQuestion } from './openrouter';

export const createQuestionsFromConfig = async (
  questionCount: number,
  distribution: { mcq: number; calculation: number; open: number },
  difficulty: 'easy' | 'medium' | 'hard',
  useAI: boolean,
  fallbackQuestions: Question[]
): Promise<Question[]> => {
  if (useAI) {
    try {
      console.log('Tentative de génération IA...');
      const generated = await generateQuestions(questionCount, difficulty, distribution);
      console.log('Questions générées avec succès:', generated.length);
      return generated.map((q, index) => ({
        ...q,
        id: index + 1
      })) as Question[];
    } catch (error) {
      console.error('Erreur génération IA:', error);
      console.log('Utilisation des questions par défaut...');
      // Fallback vers questions par défaut
    }
  }

  // Utilisation des questions par défaut avec distribution respectée
  const mcqCount = Math.round((questionCount * distribution.mcq) / 100);
  const calcCount = Math.round((questionCount * distribution.calculation) / 100);
  const openCount = questionCount - mcqCount - calcCount;

  const mcqQuestions = fallbackQuestions.filter(q => q.type === 'mcq').slice(0, mcqCount);
  const calcQuestions = fallbackQuestions.filter(q => q.type === 'calculation').slice(0, calcCount);
  const openQuestions = fallbackQuestions.filter(q => q.type === 'open').slice(0, openCount);

  const selectedQuestions = [...mcqQuestions, ...calcQuestions, ...openQuestions];
  
  // Mélanger et réassigner les IDs
  return shuffleArray(selectedQuestions).map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};