import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class ListTasksFiltersDTO {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@IsPositive()
	page: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@IsPositive()
	amount: number = 50;
}
