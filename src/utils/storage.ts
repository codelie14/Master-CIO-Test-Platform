import { TestSession, TestConfig } from '../types';

const STORAGE_KEY = 'cio_test_session';
const CONFIG_KEY = 'cio_test_config';
const SERVER_TIME_KEY = 'cio_server_time';

export const saveSession = (session: TestSession): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const loadSession = (): TestSession | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
};

export const clearSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

export const saveConfig = (config: TestConfig): void => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
};

export const loadConfig = (): TestConfig | null => {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
};

export const clearConfig = (): void => {
  try {
    localStorage.removeItem(CONFIG_KEY);
  } catch (error) {
    console.error('Error clearing config:', error);
  }
};

// Système anti-triche pour le timer
export const saveServerTime = (startTime: number): void => {
  try {
    const serverTimeData = {
      startTime,
      lastSave: Date.now(),
      checksum: generateChecksum(startTime)
    };
    localStorage.setItem(SERVER_TIME_KEY, JSON.stringify(serverTimeData));
  } catch (error) {
    console.error('Error saving server time:', error);
  }
};

export const loadServerTime = (): { startTime: number; isValid: boolean } => {
  try {
    const saved = localStorage.getItem(SERVER_TIME_KEY);
    if (!saved) return { startTime: Date.now(), isValid: false };
    
    const data = JSON.parse(saved);
    const isValid = validateChecksum(data.startTime, data.checksum);
    
    return {
      startTime: data.startTime,
      isValid
    };
  } catch (error) {
    console.error('Error loading server time:', error);
    return { startTime: Date.now(), isValid: false };
  }
};

export const clearServerTime = (): void => {
  try {
    localStorage.removeItem(SERVER_TIME_KEY);
  } catch (error) {
    console.error('Error clearing server time:', error);
  }
};

// Fonctions anti-triche
const generateChecksum = (startTime: number): string => {
  // Simple checksum basé sur le temps de début et une clé secrète
  const secret = 'cio_test_2025_security';
  return btoa(`${startTime}_${secret}`).slice(0, 16);
};

const validateChecksum = (startTime: number, checksum: string): boolean => {
  return generateChecksum(startTime) === checksum;
};

export const createNewSession = (startTime?: number): TestSession => ({
  startTime: startTime || Date.now(),
  answers: {},
  timeSpent: 0,
  markedQuestions: [],
  currentQuestion: 0,
  isCompleted: false
});