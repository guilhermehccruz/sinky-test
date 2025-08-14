import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateTaskUseCase {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async execute(id: string, dto: UpdateTaskDto) {
		const task = await this.tasksRepository.find(id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		await this.tasksRepository.update(id, dto);
	}
}
