import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeContract } from './entities/type_contract.entity';
import { Contract } from './entities/contract.entity';
import { Payment } from './entities/payment.entity';
import { TypeMethod } from './entities/type_method.entity';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { DocumentContract } from './entities/document_contract.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connection = await createConnection({
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
        });
        await connection.query(
          `CREATE DATABASE IF NOT EXISTS ${configService.get<string>('DB_NAME')}`,
        );
        await connection.end();

        return {
          type: 'mysql',
          connectTimeout: 15000,
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
            TypeContract,
            Contract,
            Payment,
            TypeMethod,
            DocumentContract,
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
    
  ],
})
export class DatabaseModule {}
