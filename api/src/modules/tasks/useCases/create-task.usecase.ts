import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskUseCase {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async execute(dto: CreateTaskDTO) {
		return this.tasksRepository.create(dto);
	}
}
