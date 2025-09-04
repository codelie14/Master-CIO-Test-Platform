import React, { useState } from 'react';
import { TestConfig } from '../types';
import { createQuestionsFromConfig } from '../services/questionGenerator';
import { questions as defaultQuestions } from '../data/questions';
import { Settings, Clock, Hash, Brain, Zap, AlertTriangle, Loader } from 'lucide-react';

interface TestConfigurationProps {
  onConfigComplete: (config: TestConfig, generatedQuestions?: any[]) => void;
}

export const TestConfiguration: React.FC<TestConfigurationProps> = ({ onConfigComplete }) => {
  const [config, setConfig] = useState<TestConfig>({
    duration: parseInt(import.meta.env.VITE_DEFAULT_DURATION) || 60,
    questionCount: parseInt(import.meta.env.VITE_DEFAULT_QUESTION_COUNT) || 35,
    questionTypes: {
      mcq: 50,
      calculation: 30,
      open: 20
    },
    useAIGeneration: import.meta.env.VITE_ENABLE_QUESTION_GENERATION === 'true',
    difficulty: 'medium'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (config.questionTypes.mcq + config.questionTypes.calculation + config.questionTypes.open !== 100) {
      setError('La répartition des types de questions doit totaliser 100%');
      return;
    }

    if (config.questionCount < 5 || config.questionCount > 100) {
      setError('Le nombre de questions doit être entre 5 et 100');
      return;
    }

    if (config.duration < 10 || config.duration > 180) {
      setError('La durée doit être entre 10 et 180 minutes');
      return;
    }

    if (config.useAIGeneration) {
      setIsGenerating(true);
      try {
        const generatedQuestions = await createQuestionsFromConfig(
          config.questionCount,
          config.questionTypes,
          config.difficulty,
          true,
          defaultQuestions
        );
        onConfigComplete(config, generatedQuestions);
      } catch (error) {
        console.error('Error generating questions:', error);
        try {
          // Fallback avec questions par défaut
          const fallbackQuestions = await createQuestionsFromConfig(
            config.questionCount,
            config.questionTypes,
            config.difficulty,
            false,
            defaultQuestions
          );
          onConfigComplete(config, fallbackQuestions);
        } catch (fallbackError) {
          setError('Erreur lors de la configuration des questions.');
        }
      } finally {
        setIsGenerating(false);
      }
    } else {
      try {
        const selectedQuestions = await createQuestionsFromConfig(
          config.questionCount,
          config.questionTypes,
          config.difficulty,
          false,
          defaultQuestions
        );
        onConfigComplete(config, selectedQuestions);
      } catch (error) {
        setError('Erreur lors de la sélection des questions.');
      }
    }
  };

  const updateQuestionType = (type: keyof typeof config.questionTypes, value: number) => {
    setConfig(prev => ({
      ...prev,
      questionTypes: {
        ...prev.questionTypes,
        [type]: value
      }
    }));
  };

  const isAIAvailable = import.meta.env.VITE_AI_ENABLED === 'true' && 
                       import.meta.env.VITE_OPENROUTER_API_KEY;

  console.log('AI Available:', isAIAvailable);
  console.log('AI Enabled:', import.meta.env.VITE_AI_ENABLED);
  console.log('API Key exists:', !!import.meta.env.VITE_OPENROUTER_API_KEY);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Settings className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Configuration de l'Examen
          </h1>
          <p className="text-gray-600">
            Personnalisez les paramètres de votre test
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Durée */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              <span>Durée du test (minutes)</span>
            </label>
            <input
              type="number"
              min="10"
              max="180"
              value={config.duration}
              onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Nombre de questions */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Hash className="w-4 h-4" />
              <span>Nombre de questions</span>
            </label>
            <input
              type="number"
              min="5"
              max="100"
              value={config.questionCount}
              onChange={(e) => setConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Répartition des types */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Répartition des types de questions (%)</label>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">QCM</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.questionTypes.mcq}
                  onChange={(e) => updateQuestionType('mcq', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Calculs</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.questionTypes.calculation}
                  onChange={(e) => updateQuestionType('calculation', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Ouvertes</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.questionTypes.open}
                  onChange={(e) => updateQuestionType('open', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="text-center">
              <span className={`text-sm font-medium ${
                config.questionTypes.mcq + config.questionTypes.calculation + config.questionTypes.open === 100
                  ? 'text-green-600' : 'text-red-600'
              }`}>
                Total: {config.questionTypes.mcq + config.questionTypes.calculation + config.questionTypes.open}%
              </span>
            </div>
          </div>

          {/* Difficulté */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Zap className="w-4 h-4" />
              <span>Niveau de difficulté</span>
            </label>
            <select
              value={config.difficulty}
              onChange={(e) => setConfig(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>

          {/* Génération IA */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.useAIGeneration}
                onChange={(e) => setConfig(prev => ({ ...prev, useAIGeneration: e.target.checked }))}
                disabled={!isAIAvailable}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
              />
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                Générer les questions avec l'IA
              </span>
              {isAIAvailable && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Disponible
                </span>
              )}
            </label>
            <p className="text-xs text-gray-500 ml-6">
              {isAIAvailable 
                ? "Utilise l'IA pour créer des questions personnalisées selon vos paramètres"
                : "IA non disponible - utilisation des questions par défaut"
              }
            </p>
          </div>

          {!isAIAvailable && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">IA non configurée</p>
                  <p className="text-xs text-yellow-700">
                    L'API OpenRouter n'est pas configurée. Utilisation des questions par défaut.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Génération en cours...</span>
              </>
            ) : (
              <span>Démarrer l'Examen</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Les paramètres seront sauvegardés pour votre prochaine session
          </p>
        </div>
      </div>
    </div>
  );
};