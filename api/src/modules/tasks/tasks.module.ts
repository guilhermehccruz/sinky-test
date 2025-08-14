import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { CreateTaskUseCase } from './useCases/create-task.usecase';
import { UpdateTaskUseCase } from './useCases/update-task.usecase';
import { DeleteTaskUseCase } from './useCases/delete-task.usecase';
import { FindTaskUseCase } from './useCases/find-task.usecase';
import { ListTasksUseCase } from './useCases/list-tasks.usecase';

@Module({
	controllers: [TasksController],
	providers: [CreateTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase, FindTaskUseCase, ListTasksUseCase],
})
export class TasksModule {}
