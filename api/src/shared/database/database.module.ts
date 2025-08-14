import { Global, Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { TasksRepository } from './repositories/tasks.repository';

@Global()
@Module({
	providers: [
		// Services
		PrismaService,

		// Repositories
		TasksRepository,
	],
	exports: [
		// Repositories
		TasksRepository,
	],
})
export class DatabaseModule {}
