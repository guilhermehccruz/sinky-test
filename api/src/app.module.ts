import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './shared/config/env';
import { DatabaseModule } from './shared/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: envSchema,
		}),
		DatabaseModule,
		TasksModule,
	],
})
export class AppModule {}
