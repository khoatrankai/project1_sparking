import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ContractService } from './contract.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTypeContractDto } from 'src/dto/create_type_contract.dto';
import { UpdateTypeContractDto } from 'src/dto/update_type_contract.dto';
import { CreateContractDto } from 'src/dto/create_contract.dto';
import { UpdateContractDto } from 'src/dto/update_contract.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getHello(): string {
    return this.contractService.getHello();
  }
  @MessagePattern({ cmd: 'create-type_contract' })
  async createTypeContract(createTypeContract: CreateTypeContractDto) {
    return this.contractService.createTypeContract(createTypeContract);
  }

  @MessagePattern({ cmd: 'update-type_contract' })
  async updateTypeContract(updateTypeContract: UpdateTypeContractDto) {
    return this.contractService.updateTypeContract(updateTypeContract);
  }

  @MessagePattern({ cmd: 'create-contract' })
  async createContract(createContract: CreateContractDto) {
    return this.contractService.createContract(createContract);
  }

  @MessagePattern({ cmd: 'update-contract' })
  async updateContract(updateContract: UpdateContractDto) {
    return this.contractService.updateContract(updateContract);
  }

  @MessagePattern({ cmd: 'get-contracts' })
  async getContracts() {
    return this.contractService.getContracts();
  }
  
}
