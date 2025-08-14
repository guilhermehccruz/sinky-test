import { IsString, IsNotEmpty } from 'class-validator';

export class AICreateTaskDTO {
	@IsString()
	@IsNotEmpty()
	prompt: string;
}
