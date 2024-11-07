import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const customValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const customErrors = validationErrors.map((error) => {
        if (error.constraints) {
          return {
            field: error.property,
            errors: Object.values(error.constraints),
          };
        } else {
          return {
            field: error.property,
            errors: [`The ${error.property} field is not allowed to exist`],
          };
        }
      });
  
      return new BadRequestException({
        statusCode: HttpStatus.BAD_GATEWAY,
        message: 'Invalid data',
        errors: customErrors,
      });
    },
  });
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(customValidationPipe)
  app.enableCors({
    origin: 'http://localhost:3000',  // Next.js đang chạy tại cổng này
    credentials: true,  // Nếu cần gửi cookies
  });
  await app.listen(3001);
}
bootstrap();
