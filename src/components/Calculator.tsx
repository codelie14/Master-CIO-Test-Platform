import React, { useState } from 'react';
import { Calculator as CalcIcon, X } from 'lucide-react';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (firstOperand: string, secondOperand: string, operation: string): string => {
    const prev = parseFloat(firstOperand);
    const current = parseFloat(secondOperand);

    switch (operation) {
      case '+': return (prev + current).toString();
      case '-': return (prev - current).toString();
      case '×': return (prev * current).toString();
      case '÷': return current !== 0 ? (prev / current).toString() : 'Error';
      case '^': return Math.pow(prev, current).toString();
      default: return secondOperand;
    }
  };

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = display;

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || '0';
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(newValue);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = () => {
    const inputValue = display;

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(newValue);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputSpecial = (func: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sqrt': result = Math.sqrt(current); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      case 'sin': result = Math.sin(current * Math.PI / 180); break;
      case 'cos': result = Math.cos(current * Math.PI / 180); break;
      default: return;
    }

    setDisplay(result.toString());
    setWaitingForOperand(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <CalcIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Calculatrice</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="bg-gray-100 p-3 rounded text-right text-xl font-mono">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button onClick={clearAll} className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded">Clear</button>
          <button onClick={() => inputOperation('÷')} className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">÷</button>
          <button onClick={() => inputSpecial('sqrt')} className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded text-sm">√</button>

          {/* Row 2 */}
          <button onClick={() => inputNumber('7')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">7</button>
          <button onClick={() => inputNumber('8')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">8</button>
          <button onClick={() => inputNumber('9')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">9</button>
          <button onClick={() => inputOperation('×')} className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">×</button>

          {/* Row 3 */}
          <button onClick={() => inputNumber('4')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">4</button>
          <button onClick={() => inputNumber('5')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">5</button>
          <button onClick={() => inputNumber('6')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">6</button>
          <button onClick={() => inputOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">-</button>

          {/* Row 4 */}
          <button onClick={() => inputNumber('1')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">1</button>
          <button onClick={() => inputNumber('2')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">2</button>
          <button onClick={() => inputNumber('3')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">3</button>
          <button onClick={() => inputOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">+</button>

          {/* Row 5 */}
          <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-300 hover:bg-gray-400 p-2 rounded">0</button>
          <button onClick={() => inputNumber('.')} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">.</button>
          <button onClick={performCalculation} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">=</button>

          {/* Row 6 - Scientific functions */}
          <button onClick={() => inputSpecial('log')} className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded text-xs">log</button>
          <button onClick={() => inputSpecial('ln')} className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded text-xs">ln</button>
          <button onClick={() => inputOperation('^')} className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded">x^y</button>
          <button onClick={() => inputSpecial('sin')} className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded text-xs">sin</button>
        </div>
      </div>
    </div>
  );
};