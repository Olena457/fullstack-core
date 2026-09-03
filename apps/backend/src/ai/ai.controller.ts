import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { IHistory } from './ai.types';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() body: { question: string; history?: IHistory[] }) {
    const answer = await this.aiService.generateChatResponse(body.question, body.history || []);
    return { answer };
  }
}
