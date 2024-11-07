import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3006
        }
      }
    ])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
  // exports:[TypeOrmModule]
})
export class CustomerModule {}
