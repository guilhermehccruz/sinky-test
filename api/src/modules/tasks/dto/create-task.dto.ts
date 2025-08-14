import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
	@IsString()
	@IsNotEmpty()
	title: string;
}
