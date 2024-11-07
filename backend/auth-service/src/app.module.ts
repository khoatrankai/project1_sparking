import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Đặt module này thành global để không cần import trong từng module khác
    envFilePath: '.env', // Đường dẫn đến tệp .env
  }),AuthModule],
})
export class AppModule {}
