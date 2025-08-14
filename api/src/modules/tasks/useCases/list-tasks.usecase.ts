import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { ListTasksFiltersDTO } from '../dto/list-tasks-filters.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListTasksUseCase {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async execute(filters: ListTasksFiltersDTO) {
		return this.tasksRepository.list(filters);
	}
}
