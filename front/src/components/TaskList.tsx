'use client';

import { useMemo } from 'react';
import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string) => Promise<void>;
}

export const TaskList = ({
  tasks,
  loading,
  error,
  onToggleComplete,
  onDelete,
  onUpdate
}: TaskListProps) => {
  // Usar useMemo para evitar recálculos desnecessários
  const { completedTasks, pendingTasks } = useMemo(() => {
    const completed = tasks.filter(task => task.isCompleted);
    const pending = tasks.filter(task => !task.isCompleted);
    return { completedTasks: completed, pendingTasks: pending };
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span>Carregando tarefas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle size={24} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <CheckCircle size={48} className="mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Nenhuma tarefa encontrada</h3>
        <p className="text-center">
          Comece criando uma nova tarefa ou use o gerador de IA para criar uma lista de tarefas!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tarefas Pendentes */}
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tarefas Pendentes ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={`pending-${task.id}`}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tarefas Concluídas */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tarefas Concluídas ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={`completed-${task.id}`}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
