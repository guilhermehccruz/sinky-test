import {
	Controller,
	Post,
	Body,
	Get,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	Query,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { CreateTaskUseCase } from './useCases/create-task.usecase';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskUseCase } from './useCases/update-task.usecase';
import { DeleteTaskUseCase } from './useCases/delete-task.usecase';
import { ListTasksUseCase } from './useCases/list-tasks.usecase';
import { FindTaskUseCase } from './useCases/find-task.usecase';
import { ListTasksFiltersDTO } from './dto/list-tasks-filters.dto';
import { AICreateTaskUseCase } from './useCases/ai-create-task.usecase';
import { AICreateTaskDTO } from './dto/ai-create-task.dto';
import { ResetTasksUseCase } from './useCases/reset-tasks.usecase';

@Controller('tasks')
export class TasksController {
	constructor(
		private readonly createTaskUseCase: CreateTaskUseCase,
		private readonly aiCreateTaskUseCase: AICreateTaskUseCase,
		private readonly updateTaskUseCase: UpdateTaskUseCase,
		private readonly deleteTaskUseCase: DeleteTaskUseCase,
		private readonly findTaskUseCase: FindTaskUseCase,
		private readonly listTasksUseCase: ListTasksUseCase,
		private readonly resetTasksUseCase: ResetTasksUseCase,
	) {}

	@Post()
	create(@Body() dto: CreateTaskDTO) {
		return this.createTaskUseCase.execute(dto);
	}

	@Post('ai')
	aiCreate(@Body() dto: AICreateTaskDTO) {
		return this.aiCreateTaskUseCase.execute(dto);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateTaskDto) {
		return this.updateTaskUseCase.execute(id, dto);
	}

	@Delete('reset')
	reset() {
		return this.resetTasksUseCase.execute();
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.deleteTaskUseCase.execute(id);
	}

	@Get(':id')
	findOne(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.findTaskUseCase.execute(id);
	}

	@Get()
	list(@Query() filters: ListTasksFiltersDTO) {
		return this.listTasksUseCase.execute(filters);
	}
}
