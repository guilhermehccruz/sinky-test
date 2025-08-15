'use client';

import { useState } from 'react';
import { Check, Trash2, Edit, Save, X } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string) => Promise<void>;
}

export const TaskItem = ({ task, onToggleComplete, onDelete, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleComplete = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await onToggleComplete(task.id);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await onDelete(task.id);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = async () => {
    if (!editTitle.trim() || isSubmitting) return;

    console.log('Salvando tarefa:', task.id, 'com título:', editTitle.trim());

    try {
      setIsSubmitting(true);
      await onUpdate(task.id, editTitle.trim());
      console.log('Tarefa salva com sucesso');
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  return (
    <div className={`flex items-center gap-3 p-4 bg-white rounded-lg border transition-all duration-200 ${
      task.isCompleted
        ? 'border-green-200 bg-green-50'
        : 'border-gray-200 hover:border-gray-300'
    }`}>
      {/* Checkbox */}
      <button
        onClick={handleToggleComplete}
        disabled={isSubmitting}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.isCompleted
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {task.isCompleted && <Check size={16} />}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-900 bg-white"
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSave}
              disabled={!editTitle.trim() || isSubmitting}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <Save size={16} />
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <p className={`text-gray-800 ${
            task.isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {!isEditing && (
          <button
            onClick={handleEdit}
            disabled={isSubmitting}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isSubmitting}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
