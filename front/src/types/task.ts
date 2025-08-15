export interface Task {
	id: string;
	title: string;
	isCompleted: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTaskRequest {
	title: string;
}

export interface UpdateTaskRequest {
	title?: string;
	isCompleted?: boolean;
}

export interface GenerateTasksRequest {
	prompt: string;
}
