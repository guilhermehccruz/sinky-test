import { TasksRepository } from 'src/shared/database/repositories/tasks.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AICreateTaskDTO } from '../dto/ai-create-task.dto';
import { OpenRouterService } from 'src/shared/llm/services/open-router.service';
import { CreateTaskDTO } from '../dto/create-task.dto';

@Injectable()
export class AICreateTaskUseCase {
	constructor(
		private readonly tasksRepository: TasksRepository,
		private readonly openRouterService: OpenRouterService,
	) {}

	private readonly systemPrompt = `
	You are a task generation assistant.
	You will take a broad user request and break it down into a numbered list of actionable to-do points.
	RULES:
	- Output must be valid JSON.
	- Each to-do item must be specific, actionable, and in imperative form.
	- Arrange items in logical order.
	- No extra commentary, only the JSON object.
	- Use the structure: {"tasks": [{"title": <string>}, ...]}.
	`;

	async execute(dto: AICreateTaskDTO) {
		try {
			const response = await this.openRouterService.generateText({
				messages: [
					{ role: 'system', content: this.systemPrompt },
					{ role: 'user', content: `<prompt>${dto.prompt}</prompt>` },
				],
				model: 'openai/gpt-oss-20b:free',
			});

			const content = response.choices.at(0)?.message.content;

			if (!content) {
				throw new Error('An error has occurred generating the tasks');
			}

			const { tasks: tasksTexts } = JSON.parse(content) as { tasks: CreateTaskDTO[] };

			return await this.tasksRepository.createMany(tasksTexts);
		} catch (error) {
			console.error(error);

			throw new InternalServerErrorException('An internal error has occurred, please try again');
		}
	}
}
