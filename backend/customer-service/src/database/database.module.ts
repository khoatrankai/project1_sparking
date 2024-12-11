import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCustomers } from './entities/account_customers.entity';
import { CustomerInfo } from './entities/customer_info.entity';
import { GroupCustomer } from './entities/group_customer.entity';
import { RoleCustomer } from './entities/role_customer.entity';
import { RoleTypeCustomer } from './entities/role_type_customer.entity';
import { InfoContact } from './entities/info_contact.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_customer',
      entities: [AccountCustomers,CustomerInfo,GroupCustomer,RoleCustomer,RoleTypeCustomer,InfoContact],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
