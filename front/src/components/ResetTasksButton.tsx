'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface ResetTasksButtonProps {
  onReset: () => Promise<void>;
  disabled?: boolean;
  taskCount: number;
}

export const ResetTasksButton = ({ onReset, disabled, taskCount }: ResetTasksButtonProps) => {
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = async () => {
    if (isResetting || disabled) return;

    try {
      setIsResetting(true);
      await onReset();
      setShowConfirm(false);
    } catch (error) {
      console.error('Erro ao resetar tarefas:', error);
    } finally {
      setIsResetting(false);
    }
  };

  if (taskCount === 0) {
    return null;
  }

  return (
    <div className="relative">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          disabled={disabled || isResetting}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Trash2 size={16} />
          Limpar Todas ({taskCount})
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Trash2 size={16} />
            {isResetting ? 'Limpando...' : 'Confirmar'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isResetting}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
