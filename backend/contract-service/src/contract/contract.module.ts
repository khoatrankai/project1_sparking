import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from 'src/database/entities/contract.entity';
import { TypeContract } from 'src/database/entities/type_contract.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Contract,TypeContract])
  ],
  controllers: [ContractController],
  providers: [ContractService],
  // exports:[TypeOrmModule]
})
export class ContractModule {}
