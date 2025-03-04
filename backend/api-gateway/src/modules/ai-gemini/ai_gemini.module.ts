import { Module } from '@nestjs/common';
import { AIGeminiController } from './ai_gemini.controller';
import { AIGeminiService } from './ai_gemini.service';

@Module({
  controllers: [AIGeminiController],
  providers: [AIGeminiService],
  exports: [AIGeminiService],
  // exports:[TypeOrmModule]
})
export class AIGeminiModule {}
