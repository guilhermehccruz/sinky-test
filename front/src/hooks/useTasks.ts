'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskRequest } from '@/types/task';
import { tasksApi } from '@/services/api';

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [generatingAI, setGeneratingAI] = useState(false);

	// Carregar todas as tarefas
	const loadTasks = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await tasksApi.getAll();
			setTasks(data);
		} catch (err) {
			setError('Erro ao carregar tarefas');
			console.error('Erro ao carregar tarefas:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	// Criar nova tarefa
	const createTask = useCallback(async (taskData: CreateTaskRequest) => {
		try {
			setError(null);
			const newTask = await tasksApi.create(taskData);
			setTasks((prev) => [newTask, ...prev]);
			return newTask;
		} catch (err) {
			setError('Erro ao criar tarefa');
			console.error('Erro ao criar tarefa:', err);
			throw err;
		}
	}, []);

	// Atualizar tarefa
	const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
		try {
			setError(null);
			console.log('Atualizando tarefa:', id, 'com updates:', updates);

			// Atualizar localmente primeiro para UI responsiva
			setTasks((prevTasks) => {
				const task = prevTasks.find((t) => t.id === id);
				if (task) {
					const updatedTask = { ...task, ...updates };
					return prevTasks.map((t) => (t.id === id ? updatedTask : t));
				}
				return prevTasks;
			});

			// Fazer a chamada da API em background
			const updatedTask = await tasksApi.update(id, updates);
			console.log('Resposta da API:', updatedTask);

			// Se a API retornou dados, atualizar com eles, senão manter a atualização local
			if (updatedTask) {
				setTasks((prevTasks) =>
					prevTasks.map((task) => (task.id === id ? updatedTask : task))
				);
			}

			return updatedTask;
		} catch (err) {
			// Em caso de erro, reverter para o estado anterior
			setTasks((prevTasks) => {
				const originalTask = prevTasks.find((t) => t.id === id);
				if (originalTask) {
					return prevTasks.map((task) => (task.id === id ? originalTask : task));
				}
				return prevTasks;
			});

			setError('Erro ao atualizar tarefa');
			console.error('Erro ao atualizar tarefa:', err);
			throw err;
		}
	}, []);

	// Deletar tarefa
	const deleteTask = useCallback(async (id: string) => {
		try {
			setError(null);
			await tasksApi.delete(id);
			setTasks((prev) => prev.filter((task) => task.id !== id));
		} catch (err) {
			setError('Erro ao deletar tarefa');
			console.error('Erro ao deletar tarefa:', err);
			throw err;
		}
	}, []);

	// Resetar todas as tarefas
	const resetAllTasks = useCallback(async () => {
		try {
			setError(null);
			await tasksApi.resetAll();
			setTasks([]);
		} catch (err) {
			setError('Erro ao resetar tarefas');
			console.error('Erro ao resetar tarefas:', err);
			throw err;
		}
	}, []);

	// Gerar tarefas com IA
	const generateTasksWithAI = useCallback(async (prompt: string) => {
		try {
			setGeneratingAI(true);
			setError(null);
			const generatedTasks = await tasksApi.generateWithAI(prompt);
			setTasks((prev) => [...generatedTasks, ...prev]);
			return generatedTasks;
		} catch (err) {
			setError('Erro ao gerar tarefas com IA');
			console.error('Erro ao gerar tarefas com IA:', err);
			throw err;
		} finally {
			setGeneratingAI(false);
		}
	}, []);

	// Toggle completar tarefa
	const toggleTaskCompletion = useCallback(
		async (id: string) => {
			setTasks((prevTasks) => {
				const task = prevTasks.find((t) => t.id === id);
				if (task) {
					// Atualizar localmente primeiro para UI responsiva
					const updatedTask = { ...task, isCompleted: !task.isCompleted };
					const updatedTasks = prevTasks.map((t) => (t.id === id ? updatedTask : t));

					// Fazer a chamada da API em background
					tasksApi.update(id, { isCompleted: !task.isCompleted }).catch((err) => {
						console.error('Erro ao atualizar tarefa:', err);
						// Reverter em caso de erro
						setTasks((currentTasks) =>
							currentTasks.map((t) => (t.id === id ? task : t))
						);
					});

					return updatedTasks;
				}
				return prevTasks;
			});
		},
		[],
	);

	// Carregar tarefas na inicialização
	useEffect(() => {
		loadTasks();
	}, [loadTasks]);

	return {
		tasks,
		loading,
		error,
		generatingAI,
		createTask,
		updateTask,
		deleteTask,
		toggleTaskCompletion,
		generateTasksWithAI,
		loadTasks,
		resetAllTasks,
	};
};
