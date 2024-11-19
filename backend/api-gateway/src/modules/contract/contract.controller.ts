import {  Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/ContractDto/create_contract.dto';
import { UpdateContractDto } from './dto/ContractDto/update_contract.dto';
import { CreatePaymentDto } from './dto/PaymentDto/create-payment.dto';
import { UpdatePaymentDto } from './dto/PaymentDto/update-payment.dto';
import { CreateTypeContractDto } from './dto/TypeContractDto/create_type_contract.dto';
import { UpdateTypeContractDto } from './dto/TypeContractDto/update_type_contract.dto';
import { CreateTypeMethodDto } from './dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from './dto/TypeMethodDto/update-type_method.dto';





@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getHello(): string {
    return this.contractService.getHello();
  }

  @Post('/type-contract')
  async createTypeContract(@Body() createTypeContractDto: CreateTypeContractDto) {
    return this.contractService.createTypeContract(createTypeContractDto);
  }

  // Update a type contract
  @Put('/type-contract/:id')
  async updateTypeContract(
    @Param('id') id: string,
    @Body() updateTypeContractDto: UpdateTypeContractDto
  ) {
    return this.contractService.updateTypeContract({ ...updateTypeContractDto, type_id: id });
  }

  // Create a new contract
  @Post('/create')
  async createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }

  // Update an existing contract
  @Put('update/:id')
  async updateContract(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.updateContract({ ...updateContractDto, contract_id: id });
  }

  // Get all contracts
  @Get('/all')
  async getContracts() {
    return this.contractService.getContracts();
  }

  // Create a new payment
  @Post('/payment')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.contractService.createPayment(createPaymentDto);
  }

  // Update an existing payment
  @Put('/payment/:id')
  async updatePayment(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.contractService.updatePayment(id, updatePaymentDto);
  }

  // Get all payments
  @Get('/payment')
  async getAllPayments() {
    return this.contractService.getAllPayments();
  }


  // Create a new type method
  @Post('/type-method')
  async createTypeMethod(@Body() createTypeMethodDto: CreateTypeMethodDto) {
    return this.contractService.createTypeMethod(createTypeMethodDto);
  }

  // Update an existing type method
  @Put('/type-method/:id')
  async updateTypeMethod(
    @Param('id') id: string,
    @Body() updateTypeMethodDto: UpdateTypeMethodDto
  ) {
    return this.contractService.updateTypeMethod(id, updateTypeMethodDto);
  }

  // Get all type methods
  @Get('/type-method')
  async getAllTypeMethods() {
    return this.contractService.getAllTypeMethods();
  }
  
}
