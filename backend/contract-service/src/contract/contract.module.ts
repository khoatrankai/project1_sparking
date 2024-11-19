import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from 'src/database/entities/contract.entity';
import { TypeContract } from 'src/database/entities/type_contract.entity';
import { Payment } from 'src/database/entities/payment.entity';
import { TypeMethod } from 'src/database/entities/type_method.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([TypeContract,Contract,Payment,TypeMethod])
  ],
  controllers: [ContractController],
  providers: [ContractService],
  // exports:[TypeOrmModule]
})
export class ContractModule {}
