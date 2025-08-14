import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDTO) {
	@IsOptional()
	@IsBoolean()
	isCompleted?: boolean;
}
