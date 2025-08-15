import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tasksApi = {
  // Buscar todas as tarefas
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Criar uma nova tarefa
  create: async (task: CreateTaskRequest): Promise<Task> => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  // Atualizar uma tarefa
  update: async (id: string, task: UpdateTaskRequest): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, task);
    return response.data;
  },

  // Deletar uma tarefa
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // Resetar todas as tarefas
  resetAll: async (): Promise<void> => {
    await api.delete('/tasks/reset');
  },

  // Gerar tarefas usando IA
  generateWithAI: async (prompt: string): Promise<Task[]> => {
    const response = await api.post('/tasks/ai', { prompt });
    return response.data;
  },
};
