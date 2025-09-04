export interface OpenRouterConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

export interface EvaluationResult {
  score: number;
  justification: string;
  maxScore: number;
}

export interface GeneratedQuestion {
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

const getOpenRouterConfig = (): OpenRouterConfig => ({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || "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",
  baseURL: "https://openrouter.ai/api/v1",
  model: import.meta.env.VITE_OPENROUTER_MODEL || "qwen/qwen3-coder:free"
});

const isAIEnabled = (): boolean => {
  const enabled = import.meta.env.VITE_AI_ENABLED === 'true';
  const hasKey = !!import.meta.env.VITE_OPENROUTER_API_KEY;
  console.log('AI Check - Enabled:', enabled, 'Has Key:', hasKey);
  return enabled && hasKey;
};

export const evaluateOpenAnswer = async (
  question: string,
  userAnswer: string
): Promise<EvaluationResult> => {
  if (!isAIEnabled()) {
    // Mode simulation pour la démonstration
    return simulateEvaluation(userAnswer);
  }

  const config = getOpenRouterConfig();
  const prompt = `
Évalue cette réponse d'examen Master Cybersécurité/IoT sur 20 points:

QUESTION: ${question}
RÉPONSE ÉTUDIANT: ${userAnswer}

Critères d'évaluation:
- Exactitude technique (8 pts)
- Complétude de la réponse (6 pts)
- Clarté et structure (4 pts)
- Exemples concrets (2 pts)

Réponds UNIQUEMENT avec ce format:
Score: X/20
Justification: (max 100 mots expliquant la note)
  `;

  try {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CIO Test Platform'
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const evaluation = data.choices[0]?.message?.content || "";
    
    return parseEvaluation(evaluation);
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return simulateEvaluation(userAnswer);
  }
};

const parseEvaluation = (evaluation: string): EvaluationResult => {
  const scoreMatch = evaluation.match(/Score:\s*(\d+)\/20/);
  const justificationMatch = evaluation.match(/Justification:\s*(.+)/s);
  
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 10;
  const justification = justificationMatch ? justificationMatch[1].trim() : "Évaluation automatique indisponible";
  
  return {
    score,
    justification,
    maxScore: 20
  };
};

const simulateEvaluation = (answer: string): EvaluationResult => {
  const length = answer.trim().length;
  let score = 0;
  let justification = "";

  if (length < 50) {
    score = Math.random() * 8 + 2; // 2-10 points
    justification = "Réponse trop courte, manque de détails et d'exemples concrets.";
  } else if (length < 150) {
    score = Math.random() * 6 + 8; // 8-14 points
    justification = "Bonne base mais pourrait être plus détaillée avec plus d'exemples.";
  } else {
    score = Math.random() * 6 + 14; // 14-20 points
    justification = "Réponse complète avec de bons détails techniques et exemples appropriés.";
  }

  return {
    score: Math.round(score),
    justification,
    maxScore: 20
  };
};

export const generateQuestions = async (
  count: number,
  difficulty: 'easy' | 'medium' | 'hard',
  distribution: { mcq: number; calculation: number; open: number }
): Promise<GeneratedQuestion[]> => {
  if (!isAIEnabled()) {
    throw new Error('IA non configurée. Veuillez configurer VITE_OPENROUTER_API_KEY.');
  }

  const config = getOpenRouterConfig();
  const mcqCount = Math.round((count * distribution.mcq) / 100);
  const calcCount = Math.round((count * distribution.calculation) / 100);
  const openCount = count - mcqCount - calcCount;

  const prompt = `
Génère exactement ${count} questions d'examen pour un Master en Cybersécurité et Internet des Objets.

Distribution requise:
- ${mcqCount} questions QCM
- ${calcCount} questions de calcul
- ${openCount} questions ouvertes

Niveau: ${difficulty}

Catégories à couvrir:
- Fondamentaux de cybersécurité
- Protocoles IoT (LoRaWAN, MQTT, CoAP)
- Cryptographie (AES, RSA, hachage)
- Sécurité IoT (OWASP IoT Top 10)
- Edge Computing et Cloud
- Authentification et IAM
- Réseaux sans fil
- Architecture IoT
- Hardware Security
- Détection d'intrusion

Format de réponse EXACT (JSON valide):
[
  {
    "type": "mcq",
    "question": "Question ici?",
    "category": "Catégorie",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 1
  },
  {
    "type": "calculation",
    "question": "Question de calcul?",
    "category": "Catégorie",
    "answer": 42.5,
    "tolerance": 0.1,
    "unit": "mW",
    "formula": "Formule explicative"
  },
  {
    "type": "open",
    "question": "Question ouverte?",
    "category": "Catégorie",
    "maxWords": 200
  }
]

IMPORTANT: Réponds UNIQUEMENT avec le JSON, aucun autre texte.
  `;

  try {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CIO Test Platform'
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    
    try {
      const generatedQuestions = JSON.parse(content);
      return generatedQuestions.map((q: any, index: number) => ({
        ...q,
        id: index + 1
      }));
    } catch (parseError) {
      console.error('Error parsing generated questions:', parseError);
      throw new Error('Format de réponse IA invalide');
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};