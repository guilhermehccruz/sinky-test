import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index';

@Injectable()
export class OpenRouterService {
	private readonly client: OpenAI;

	constructor(configService: ConfigService) {
		this.client = new OpenAI({
			baseURL: 'https://openrouter.ai/api/v1',
			apiKey: configService.getOrThrow('OPEN_ROUTER_API_KEY'),
		});
	}

	async generateText({ messages, model }: OpenRouterGenerateTextParams) {
		return await this.client.chat.completions.create({
			messages,
			model,
			reasoning_effort: 'minimal',
		});
	}

	static readonly availableModels = ['openai/gpt-oss-20b:free'] as const;
}

export interface OpenRouterGenerateTextParams {
	messages: ChatCompletionMessageParam[];
	model: (typeof OpenRouterService.availableModels)[number];
}
