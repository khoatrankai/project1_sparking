import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { ContractService } from './contract.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTypeContractDto } from 'src/dto/TypeContractDto/create_type_contract.dto';
import { UpdateTypeContractDto } from 'src/dto/TypeContractDto/update_type_contract.dto';
import { CreateContractDto } from 'src/dto/ContractDto/create_contract.dto';
import { UpdateContractDto } from 'src/dto/ContractDto/update_contract.dto';
import { CreatePaymentDto } from 'src/dto/PaymentDto/create-payment.dto';
import { UpdatePaymentDto } from 'src/dto/PaymentDto/update-payment.dto';
import { CreateTypeMethodDto } from 'src/dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from 'src/dto/TypeMethodDto/update-type_method.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getHello(): string {
    return this.contractService.getHello();
  }
  // Type Contract patterns
  @MessagePattern({ cmd: 'create-type_contract' })
  async createTypeContract(createTypeContract: CreateTypeContractDto) {
    return this.contractService.createTypeContract(createTypeContract);
  }

  @MessagePattern({ cmd: 'get-type_contracts' })
  async getTypeContract() {
    return this.contractService.getAllTypeContracts();
  }

  @MessagePattern({ cmd: 'get-type-full_contracts' })
  async getTypeFullContract() {
    return this.contractService.getFullTypeContracts();
  }

  @MessagePattern({ cmd: 'update-type_contract' })
  async updateTypeContract(updateTypeContract: UpdateTypeContractDto) {
    return this.contractService.updateTypeContract(updateTypeContract);
  }

  // Contract patterns
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

  @MessagePattern({ cmd: 'get-year_contracts' })
  async getYearContracts(@Payload('year') year:number) {
    return this.contractService.getYearContracts(year);
  }

  @MessagePattern({ cmd: 'get-contract' })
  async getContract(@Payload() data:{id:string}) {
    return this.contractService.getContractID(data.id);
  }
  @MessagePattern({ cmd: 'get-contract_ids' })
  async getContractIds(@Payload() data:string[]) {
    return this.contractService.getContractIDs(data);
  }

  // Payment patterns
  @MessagePattern({ cmd: 'create-payment' })
  async createPayment(createPaymentDto: CreatePaymentDto) {
    return this.contractService.createPayment(createPaymentDto);
  }

  @MessagePattern({ cmd: 'update-payment' })
  async updatePayment(data: { payment_id: string; updatePaymentDto: UpdatePaymentDto }) {
    return this.contractService.updatePayment(data.payment_id, data.updatePaymentDto);
  }

  @MessagePattern({ cmd: 'get-payment' })
  async getPayment(payment_id: string) {
    return this.contractService.getPayment(payment_id);
  }

  @MessagePattern({ cmd: 'get-all-payments' })
  async getAllPayments() {
    return this.contractService.getAllPayments();
  }

  
  @MessagePattern({ cmd: 'create-type_method' })
  async createTypeMethod(createTypeMethodDto: CreateTypeMethodDto) {
    return this.contractService.createTypeMethod(createTypeMethodDto);
  }

  @MessagePattern({ cmd: 'update-type_method' })
  async updateTypeMethod(data: { type_method_id: string; updateTypeMethodDto: UpdateTypeMethodDto }) {
    return this.contractService.updateTypeMethod(data.type_method_id, data.updateTypeMethodDto);
  }

  @MessagePattern({ cmd: 'get-type_method' })
  async getTypeMethod(type_method_id: string) {
    return this.contractService.getTypeMethod(type_method_id);
  }

  @MessagePattern({ cmd: 'get-all-type_methods' })
  async getAllTypeMethods() {
    return this.contractService.getAllTypeMethods();
  }
  
}
