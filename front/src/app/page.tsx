'use client';

import { useTasks } from '@/hooks/useTasks';
import { CreateTaskForm } from '@/components/CreateTaskForm';
import { AITaskGenerator } from '@/components/AITaskGenerator';
import { TaskList } from '@/components/TaskList';
import { ResetTasksButton } from '@/components/ResetTasksButton';
import { Sparkles, CheckSquare } from 'lucide-react';

export default function Home() {
  const {
    tasks,
    loading,
    error,
    generatingAI,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    generateTasksWithAI,
    resetAllTasks,
  } = useTasks();

  const handleCreateTask = async (title: string) => {
    await createTask({ title });
  };

  const handleUpdateTask = async (id: string, title: string) => {
    await updateTask(id, { title });
  };

  const handleGenerateTasks = async (objective: string) => {
    await generateTasksWithAI(objective);
  };

  const completedCount = tasks.filter(task => task.isCompleted).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <CheckSquare className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart To-Do List
            </h1>
            <Sparkles className="text-purple-500" size={24} />
          </div>
          <p className="text-gray-600">
            Organize suas tarefas com inteligência artificial
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Section */}
        {totalCount > 0 && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Progresso</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {completedCount} de {totalCount} tarefas concluídas
                </span>
                <ResetTasksButton
                  onReset={resetAllTasks}
                  disabled={loading || generatingAI}
                  taskCount={totalCount}
                />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {progressPercentage.toFixed(0)}% concluído
            </p>
          </div>
        )}

        {/* AI Task Generator */}
        <div className="mb-8">
          <AITaskGenerator
            onGenerateTasks={handleGenerateTasks}
            disabled={generatingAI}
          />
        </div>

        {/* Create Task Form */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Adicionar Nova Tarefa
          </h2>
          <CreateTaskForm
            onCreateTask={handleCreateTask}
            disabled={generatingAI}
          />
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">
          <p>
            Smart To-Do List - Organize suas tarefas com inteligência artificial
          </p>
        </div>
      </footer>
    </div>
  );
}
