import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AIGeminiService } from './ai_gemini.service';

// import { RoleGuard } from 'src/guards/role.guard';

@Controller('ai-gemini')
export class AIGeminiController {
  constructor(private readonly aiGeminiService: AIGeminiService) {}

  @Post()
  analystTextCustomer(@Body('text') text:string){
    return this.aiGeminiService.analystTextCustomer(text);
  }

  
}
