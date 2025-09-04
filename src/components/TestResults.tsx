import React, { useState, useEffect } from 'react';
import { Question, TestSession, TestResults as ResultsType } from '../types';
import { evaluateOpenAnswer } from '../services/openrouter';
import { Trophy, Clock, BarChart3, Download, CheckCircle, X, Loader } from 'lucide-react';

interface TestResultsProps {
  session: TestSession;
  questions: Question[];
  onRestart: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ session, questions, onRestart }) => {
  const [results, setResults] = useState<ResultsType | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(true);
  const [openAnswerScores, setOpenAnswerScores] = useState<Record<number, { score: number; justification: string }>>({});

  useEffect(() => {
    calculateResults();
  }, []);

  const calculateResults = async () => {
    setIsEvaluating(true);

    let mcqScore = 0;
    let mcqTotal = 0;
    let calculationScore = 0;
    let calculationTotal = 0;
    let openScore = 0;
    let openTotal = 0;

    const categoryScores: Record<string, { score: number; total: number }> = {};
    const newOpenAnswerScores: Record<number, { score: number; justification: string }> = {};

    // Evaluate each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = session.answers[i];
      const category = question.category;

      if (!categoryScores[category]) {
        categoryScores[category] = { score: 0, total: 0 };
      }

      if (question.type === 'mcq') {
        mcqTotal += 20;
        categoryScores[category].total += 20;
        
        if (userAnswer === question.correct) {
          mcqScore += 20;
          categoryScores[category].score += 20;
        }
      } else if (question.type === 'calculation') {
        calculationTotal += 20;
        categoryScores[category].total += 20;
        
        if (userAnswer !== undefined && question.answer !== undefined) {
          const tolerance = question.tolerance || 0;
          const isCorrect = Math.abs(Number(userAnswer) - question.answer) <= tolerance;
          if (isCorrect) {
            calculationScore += 20;
            categoryScores[category].score += 20;
          }
        }
      } else if (question.type === 'open') {
        openTotal += 20;
        categoryScores[category].total += 20;
        
        if (userAnswer && typeof userAnswer === 'string') {
          try {
            const evaluation = await evaluateOpenAnswer(question.question, userAnswer);
            openScore += evaluation.score;
            categoryScores[category].score += evaluation.score;
            newOpenAnswerScores[i] = {
              score: evaluation.score,
              justification: evaluation.justification
            };
          } catch (error) {
            console.error('Error evaluating open answer:', error);
            // Fallback scoring
            const score = Math.max(10, Math.min(18, userAnswer.length / 10));
            openScore += score;
            categoryScores[category].score += score;
            newOpenAnswerScores[i] = {
              score: Math.round(score),
              justification: "Évaluation automatique - réponse de longueur appropriée"
            };
          }
        }
      }
    }

    setOpenAnswerScores(newOpenAnswerScores);

    const totalScore = mcqScore + calculationScore + openScore;
    const totalPossible = mcqTotal + calculationTotal + openTotal;
    const timeSpent = Math.floor((Date.now() - session.startTime) / 1000);

    const finalCategoryScores: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      finalCategoryScores[category] = scores.total > 0 ? (scores.score / scores.total) * 100 : 0;
    });

    const finalResults: ResultsType = {
      totalScore: (totalScore / totalPossible) * 100,
      mcqScore: mcqTotal > 0 ? (mcqScore / mcqTotal) * 100 : 0,
      calculationScore: calculationTotal > 0 ? (calculationScore / calculationTotal) * 100 : 0,
      openScore: openTotal > 0 ? (openScore / openTotal) * 100 : 0,
      timeSpent,
      completionRate: (Object.keys(session.answers).length / questions.length) * 100,
      categoryScores: finalCategoryScores
    };

    setResults(finalResults);
    setIsEvaluating(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
  };

  const exportToPDF = () => {
    // Simulate PDF export - in production, use a library like jsPDF
    alert('Fonctionnalité d\'export PDF à implémenter avec jsPDF');
  };

  if (isEvaluating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Évaluation en cours...</h2>
          <p className="text-gray-600">Analyse des réponses ouvertes par IA</p>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Résultats de l'Examen</h1>
                <p className="text-gray-600">Master Cybersécurité et Internet des Objets</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{results.totalScore.toFixed(1)}%</p>
              <p className="text-gray-600">Score global</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">QCM</p>
                <p className="text-2xl font-bold text-green-600">{results.mcqScore.toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calculs</p>
                <p className="text-2xl font-bold text-blue-600">{results.calculationScore.toFixed(1)}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions ouvertes</p>
                <p className="text-2xl font-bold text-purple-600">{results.openScore.toFixed(1)}%</p>
              </div>
              <Trophy className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temps</p>
                <p className="text-2xl font-bold text-orange-600">{formatTime(results.timeSpent)}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scores par catégorie</h3>
            <div className="space-y-3">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-700">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(score, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{score.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Révision des questions</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = session.answers[index];
                const hasAnswer = userAnswer !== undefined;
                let isCorrect = false;

                if (question.type === 'mcq') {
                  isCorrect = userAnswer === question.correct;
                } else if (question.type === 'calculation') {
                  const tolerance = question.tolerance || 0;
                  isCorrect = question.answer !== undefined && 
                    Math.abs(Number(userAnswer) - question.answer) <= tolerance;
                } else if (question.type === 'open') {
                  const evaluation = openAnswerScores[index];
                  isCorrect = evaluation && evaluation.score >= 15; // 75% threshold
                }

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {question.question.slice(0, 50)}...
                        </p>
                        <p className="text-xs text-gray-500">{question.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {hasAnswer ? (
                        <>
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                          {question.type === 'open' && openAnswerScores[index] && (
                            <span className="text-sm font-medium">
                              {openAnswerScores[index].score}/20
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-red-500">Non répondue</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={exportToPDF}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Exporter PDF</span>
          </button>
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <span>Configurer Nouveau Test</span>
          </button>
        </div>

        {/* Open Answer Details */}
        {Object.keys(openAnswerScores).length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Détail des questions ouvertes</h3>
            <div className="space-y-4">
              {Object.entries(openAnswerScores).map(([index, evaluation]) => {
                const questionIndex = parseInt(index);
                const question = questions[questionIndex];
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-800">Q{questionIndex + 1}: {question.question}</p>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        evaluation.score >= 15 ? 'bg-green-100 text-green-800' :
                        evaluation.score >= 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {evaluation.score}/20
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Votre réponse :</strong> {session.answers[questionIndex] as string}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Évaluation :</strong> {evaluation.justification}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};