'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AITaskGeneratorProps {
  onGenerateTasks: (objective: string) => Promise<void>;
  disabled?: boolean;
}

export const AITaskGenerator = ({ onGenerateTasks, disabled }: AITaskGeneratorProps) => {
  const [objective, setObjective] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective.trim() || isGenerating || disabled) return;

    try {
      setIsGenerating(true);
      await onGenerateTasks(objective.trim());
      setObjective('');
    } catch (error) {
      console.error('Erro ao gerar tarefas:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Gerador Inteligente de Tarefas</h3>
      </div>

      <p className="text-gray-600 mb-4">
        Descreva seu objetivo e deixe a IA criar uma lista de subtarefas para você!
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Ex: Planejar uma viagem para Paris, Organizar uma festa de aniversário, Preparar para uma entrevista de emprego..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none placeholder-gray-600 text-gray-900 bg-white"
          rows={3}
          disabled={isGenerating || disabled}
        />

        <button
          type="submit"
          disabled={!objective.trim() || isGenerating || disabled}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
        >
          <Sparkles size={20} />
          {isGenerating ? 'Gerando tarefas...' : 'Gerar Tarefas com IA'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>💡 Dica: Seja específico sobre seu objetivo para obter melhores resultados!</p>
      </div>
    </div>
  );
};
