import { Module } from '@nestjs/common';
import { OpenRouterService } from './services/open-router.service';

@Module({
	providers: [OpenRouterService],
	exports: [OpenRouterService],
})
export class LLMModule {}
