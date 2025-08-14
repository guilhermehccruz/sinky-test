import { CreateTaskDTO } from 'src/modules/tasks/dto/create-task.dto';
import { PrismaService } from '../services/prisma.service';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { ListTasksFiltersDTO } from 'src/modules/tasks/dto/list-tasks-filters.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateTaskDTO) {
		return await this.prisma.task.create({ data });
	}

	async createMany(data: CreateTaskDTO[]) {
		return await this.prisma.task.createManyAndReturn({ data });
	}

	async update(id: string, data: UpdateTaskDto) {
		return await this.prisma.task.update({ where: { id }, data });
	}

	async delete(id: string) {
		return await this.prisma.task.delete({ where: { id } });
	}

	async find(id: string) {
		return await this.prisma.task.findFirst({ where: { id } });
	}

	async list(filters: ListTasksFiltersDTO) {
		return await this.prisma.task.findMany({
			skip: filters.amount * (filters.page - 1),
			take: filters.amount,
			orderBy: { createdAt: 'desc' },
		});
	}

	async reset() {
		await this.prisma.task.deleteMany();
	}
}
