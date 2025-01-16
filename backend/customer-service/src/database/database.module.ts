import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCustomers } from './entities/account_customers.entity';
import { CustomerInfo } from './entities/customer_info.entity';
import { GroupCustomer } from './entities/group_customer.entity';
import { RoleCustomer } from './entities/role_customer.entity';
import { RoleTypeCustomer } from './entities/role_type_customer.entity';
import { InfoContact } from './entities/info_contact.entity';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

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
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
            AccountCustomers,
            CustomerInfo,
            GroupCustomer,
            RoleCustomer,
            RoleTypeCustomer,
            InfoContact,
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
