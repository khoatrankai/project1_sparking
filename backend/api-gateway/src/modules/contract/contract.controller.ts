import {  Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateTypeContractDto } from './dto/create_type_contract.dto';
import { UpdateTypeContractDto } from './dto/update_type_contract.dto';
import { CreateContractDto } from './dto/create_contract.dto';
import { UpdateContractDto } from './dto/update_contract.dto';



@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getHello(): string {
    return this.contractService.getHello();
  }

  @Post('type/create')
  async createTypeContract(@Body() createTypeContractDto: CreateTypeContractDto) {
    return this.contractService.sendCreateTypeContract(createTypeContractDto);
  }

  @Put('type/update')
  async updateTypeContract(@Body() updateTypeContractDto: UpdateTypeContractDto) {
    return this.contractService.sendUpdateTypeContract(updateTypeContractDto);
  }

  @Post('create')
  async createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.sendCreateContract(createContractDto);
  }

  @Put('update')
  async updateContract(@Body() updateContractDto: UpdateContractDto) {
    return this.contractService.sendUpdateContract(updateContractDto);
  }
  
}
