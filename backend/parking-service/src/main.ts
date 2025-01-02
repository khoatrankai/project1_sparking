import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,  // Next.js đang chạy tại cổng này
    credentials: true,  // Nếu cần gửi cookies
  });
  await app.listen(3001);
}
bootstrap();
