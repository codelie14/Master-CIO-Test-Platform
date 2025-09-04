import React, { useEffect, useState } from 'react';
import { Shield, Clock, BookOpen, Calculator, Brain, Settings as SettingsIcon } from 'lucide-react';
import { loadSession, loadConfig, clearSession, clearServerTime } from '../utils/storage';
import { TestSession, TestConfig } from '../types';
import { AdminPanel } from './AdminPanel';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [hasExistingSession, setHasExistingSession] = useState(false);
  const [existingConfig, setExistingConfig] = useState<TestConfig | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const session = loadSession();
    const config = loadConfig();
    
    if (session && !session.isCompleted) {
      setHasExistingSession(true);
      setExistingConfig(config);
    }
  }, []);

  const handleContinueSession = () => {
    onStart();
  };

  const handleNewSession = () => {
    clearSession();
    clearServerTime();
    setHasExistingSession(false);
    onStart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Examen Master CIO
          </h1>
          <p className="text-gray-600 text-lg">
            Cybersécurité et Internet des Objets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Durée</h3>
                <p className="text-gray-600">60 minutes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Questions</h3>
                <p className="text-gray-600">100 questions mixtes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calculator className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Outils</h3>
                <p className="text-gray-600">Calculatrice intégrée</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-orange-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Évaluation</h3>
                <p className="text-gray-600">IA pour questions ouvertes</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Types de questions</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• <strong>QCM (50%)</strong> - Concepts fondamentaux</li>
              <li>• <strong>Calculs (30%)</strong> - Applications pratiques</li>
              <li>• <strong>Questions ouvertes (20%)</strong> - Analyse critique</li>
            </ul>
          </div>
        </div>

        {hasExistingSession && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Session en cours détectée
            </h3>
            <p className="text-blue-700 mb-4">
              Vous avez une session de test non terminée. Voulez-vous la continuer ou commencer un nouveau test ?
            </p>
            {existingConfig && (
              <div className="text-sm text-blue-600 mb-4">
                <p>Configuration actuelle : {existingConfig.questionCount} questions, {existingConfig.duration} minutes</p>
              </div>
            )}
            <div className="flex space-x-3">
              <button
                onClick={handleContinueSession}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Continuer la session
              </button>
              <button
                onClick={handleNewSession}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                Nouveau test
              </button>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-yellow-800 mb-2">Instructions importantes</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Vous pouvez naviguer librement entre les questions</li>
            <li>• Vos réponses sont sauvegardées automatiquement</li>
            <li>• Marquez les questions difficiles pour les réviser</li>
            <li>• Le timer est sécurisé contre la manipulation</li>
            <li>• Utilisez la calculatrice pour les questions de calcul</li>
            <li>• Les questions peuvent être générées par IA selon vos besoins</li>
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={hasExistingSession ? handleContinueSession : onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg"
          >
            {hasExistingSession ? 'Continuer l\'Examen' : 'Configurer l\'Examen'}
          </button>
          
          <div className="mt-4">
            <button
              onClick={() => setShowAdminPanel(true)}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1 mx-auto"
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Administration</span>
            </button>
          </div>
        </div>
      </div>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
};