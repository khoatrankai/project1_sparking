import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { GroupCustomer } from 'src/database/entities/group_customer.entity';
import { RoleTypeCustomer } from 'src/database/entities/role_type_customer.entity';
import { RoleCustomer } from 'src/database/entities/role_customer.entity';
import { AccountCustomers } from 'src/database/entities/account_customers.entity';
import { CustomerInfo } from 'src/database/entities/customer_info.entity';
import { InfoContact } from 'src/database/entities/info_contact.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SYSTEM',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3004
        }
      }
    ]),
    TypeOrmModule.forFeature([GroupCustomer,RoleTypeCustomer,RoleCustomer,AccountCustomers,CustomerInfo,InfoContact])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  // exports:[TypeOrmModule]
})
export class CustomerModule {}
