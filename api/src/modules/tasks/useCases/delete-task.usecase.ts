import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';

@Injectable()
export class DeleteTaskUseCase {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async execute(id: string) {
		const task = await this.tasksRepository.find(id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		await this.tasksRepository.delete(id);
	}
}
