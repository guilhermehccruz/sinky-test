'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface CreateTaskFormProps {
  onCreateTask: (title: string) => Promise<void>;
  disabled?: boolean;
}

export const CreateTaskForm = ({ onCreateTask, disabled }: CreateTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting || disabled) return;

    try {
      setIsSubmitting(true);
      await onCreateTask(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-gray-900 bg-white"
          disabled={isSubmitting || disabled}
        />
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting || disabled}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus size={20} />
          {isSubmitting ? 'Criando...' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
};
