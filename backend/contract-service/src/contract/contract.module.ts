import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from 'src/database/entities/contract.entity';
import { TypeContract } from 'src/database/entities/type_contract.entity';
import { Payment } from 'src/database/entities/payment.entity';
import { TypeMethod } from 'src/database/entities/type_method.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DocumentContract } from 'src/database/entities/document_contract.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3006,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user_service',
          port: 3005,
        },
      },
      {
        name: 'PROJECT',
        transport: Transport.TCP,
        options: {
          host: 'project_service',
          port: 3013,
        },
      },
      {
        name: 'PRODUCT',
        transport: Transport.TCP,
        options: {
          host: 'product_service',
          port: 3012,
        },
      },
    ]),
    TypeOrmModule.forFeature([
      TypeContract,
      Contract,
      Payment,
      TypeMethod,
      DocumentContract,
    ]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
  // exports:[TypeOrmModule]
})
export class ContractModule {}
