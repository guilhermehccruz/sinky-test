import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { CreateTaskUseCase } from './useCases/create-task.usecase';
import { UpdateTaskUseCase } from './useCases/update-task.usecase';
import { DeleteTaskUseCase } from './useCases/delete-task.usecase';
import { FindTaskUseCase } from './useCases/find-task.usecase';
import { ListTasksUseCase } from './useCases/list-tasks.usecase';
import { AICreateTaskUseCase } from './useCases/ai-create-task.usecase';
import { LLMModule } from 'src/shared/llm/llm.module';
import { ResetTasksUseCase } from './useCases/reset-tasks.usecase';

@Module({
	imports: [LLMModule],
	controllers: [TasksController],
	providers: [
		CreateTaskUseCase,
		UpdateTaskUseCase,
		DeleteTaskUseCase,
		FindTaskUseCase,
		ListTasksUseCase,
		AICreateTaskUseCase,
		ResetTasksUseCase,
	],
})
export class TasksModule {}
