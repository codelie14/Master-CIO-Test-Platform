import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { saveServerTime, loadServerTime } from '../utils/storage';

interface TimerProps {
  duration: number; // en minutes
  startTime: number; // timestamp de début
  onTimeUp: () => void;
  onTenMinutesLeft: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, startTime, onTimeUp, onTenMinutesLeft }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Calcul du temps restant basé sur le temps de début réel
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, (duration * 60) - elapsed);
  });
  const [hasAlerted, setHasAlerted] = useState(false);
  const [isTimerValid, setIsTimerValid] = useState(true);

  useEffect(() => {
    // Vérification anti-triche au démarrage
    const { startTime: savedStartTime, isValid } = loadServerTime();
    
    if (!isValid || Math.abs(savedStartTime - startTime) > 5000) { // 5 secondes de tolérance
      setIsTimerValid(false);
      return;
    }

    // Sauvegarde sécurisée du temps de début
    saveServerTime(startTime);
  }, [startTime]);

  useEffect(() => {
    if (!isTimerValid) return;

    const interval = setInterval(() => {
      // Recalcul basé sur le temps réel pour éviter la manipulation
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const newTime = Math.max(0, (duration * 60) - elapsed);
      
      setTimeLeft(newTime);
      
      if (newTime <= 600 && !hasAlerted) { // 10 minutes = 600 secondes
        setHasAlerted(true);
        onTenMinutesLeft();
      }
      
      if (newTime <= 0) {
        onTimeUp();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, startTime, hasAlerted, onTimeUp, onTenMinutesLeft, isTimerValid]);

  // Vérification périodique anti-triche
  useEffect(() => {
    const antiCheatInterval = setInterval(() => {
      const { startTime: savedStartTime, isValid } = loadServerTime();
      
      if (!isValid || Math.abs(savedStartTime - startTime) > 5000) {
        setIsTimerValid(false);
        clearInterval(antiCheatInterval);
      }
    }, 30000); // Vérification toutes les 30 secondes

    return () => clearInterval(antiCheatInterval);
  }, [startTime]);

  if (!isTimerValid) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-mono text-lg font-bold">
        <AlertTriangle className="w-5 h-5" />
        <span>TIMER INVALIDE</span>
      </div>
    );
  }
        
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft <= 600; // 10 minutes
  const isCritical = timeLeft <= 300; // 5 minutes

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg font-bold transition-all duration-300 ${
      isCritical 
        ? 'bg-red-100 text-red-700 animate-pulse' 
        : isLowTime 
          ? 'bg-yellow-100 text-yellow-700' 
          : 'bg-blue-100 text-blue-700'
    }`}>
      {isLowTime ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};