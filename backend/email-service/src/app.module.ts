import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Đặt module này thành global để không cần import trong từng module khác
    envFilePath: '.env', // Đường dẫn đến tệp .env
  }),EmailModule],
})
export class AppModule {}
