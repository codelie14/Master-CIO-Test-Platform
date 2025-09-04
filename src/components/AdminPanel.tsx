import React, { useState } from 'react';
import { Shield, Settings, Database, Brain, AlertTriangle, CheckCircle } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || '');
  const [model, setModel] = useState(import.meta.env.VITE_OPENROUTER_MODEL || 'qwen/qwen3-coder:free');
  const [aiEnabled, setAiEnabled] = useState(import.meta.env.VITE_AI_ENABLED === 'true');
  const [testConnection, setTestConnection] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleTestConnection = async () => {
    if (!apiKey) {
      setTestConnection('error');
      return;
    }

    setTestConnection('testing');
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'CIO Test Platform'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Test de connexion' }],
          max_tokens: 10
        })
      });

      if (response.ok) {
        setTestConnection('success');
      } else {
        setTestConnection('error');
      }
    } catch (error) {
      setTestConnection('error');
    }

    setTimeout(() => setTestConnection('idle'), 3000);
  };

  const handleSave = () => {
    // Note: En production, ces valeurs seraient sauvegardées côté serveur
    alert('Configuration sauvegardée (simulation - en production, ceci serait géré côté serveur)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Panneau d'Administration</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Configuration IA */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <Brain className="w-5 h-5" />
              <span>Configuration IA</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clé API OpenRouter
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modèle IA
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="qwen/qwen3-coder:free">Qwen 3 Coder (Gratuit)</option>
                  <option value="anthropic/claude-3-sonnet">Claude 3 Sonnet</option>
                  <option value="openai/gpt-4">GPT-4</option>
                  <option value="meta-llama/llama-3.1-8b-instruct:free">Llama 3.1 8B (Gratuit)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ai-enabled"
                  checked={aiEnabled}
                  onChange={(e) => setAiEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="ai-enabled" className="text-sm font-medium text-gray-700">
                  Activer l'évaluation IA
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleTestConnection}
                  disabled={!apiKey || testConnection === 'testing'}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  {testConnection === 'testing' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Test...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      <span>Tester la connexion</span>
                    </>
                  )}
                </button>

                {testConnection === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Connexion réussie</span>
                  </div>
                )}

                {testConnection === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Échec de connexion</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistiques système */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <Settings className="w-5 h-5" />
              <span>Informations Système</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Version :</span>
                <span className="ml-2 font-medium">1.0.0</span>
              </div>
              <div>
                <span className="text-gray-600">Environnement :</span>
                <span className="ml-2 font-medium">Production</span>
              </div>
              <div>
                <span className="text-gray-600">Questions par défaut :</span>
                <span className="ml-2 font-medium">35 disponibles</span>
              </div>
              <div>
                <span className="text-gray-600">Sécurité timer :</span>
                <span className="ml-2 font-medium text-green-600">Activée</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};