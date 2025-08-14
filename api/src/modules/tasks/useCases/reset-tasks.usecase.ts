import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetTasksUseCase {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async execute() {
		await this.tasksRepository.reset();
	}
}
