import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/ContractDto/create_contract.dto';
import { UpdateContractDto } from './dto/ContractDto/update_contract.dto';
import { CreatePaymentDto } from './dto/PaymentDto/create-payment.dto';
import { UpdatePaymentDto } from './dto/PaymentDto/update-payment.dto';
import { CreateTypeContractDto } from './dto/TypeContractDto/create_type_contract.dto';
import { UpdateTypeContractDto } from './dto/TypeContractDto/update_type_contract.dto';
import { CreateTypeMethodDto } from './dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from './dto/TypeMethodDto/update-type_method.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { GetFilterPaymentDto } from './dto/PaymentDto/get-filter.dto';
import { GetFilterContractDto } from './dto/ContractDto/get-filter.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentContractDto } from './dto/DocumentContractDto/create-document_contract.dto';
import { Request } from 'express';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  getHello() {
    return this.contractService.getHello();
  }

  @Get('type-contract')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'contract',
    'contract-read',
    'contract-edit',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async getTypeContracts() {
    return this.contractService.getTypeContracts();
  }

  @Get('dashboard')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getFullContractDashboard() {
    return this.contractService.getFullContractDashboard();
  }

  @Get('contract-by-type-id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'contract',
    'admin-top',
    'contract-read',
    'contract-read',
  ])
  @SetMetadata('type', ['admin'])
  async getFullContractByTypeID(@Param('id') id: string) {
    return this.contractService.getFullContractByTypeID(id);
  }

  @Get('full-type-contract')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'contract',
    'contract-read',
    'contract-edit',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async getFullTypeContracts() {
    return this.contractService.getFullTypeContracts();
  }

  @Post('/type-contract')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createTypeContract(
    @Body() createTypeContractDto: CreateTypeContractDto,
  ) {
    return this.contractService.createTypeContract(createTypeContractDto);
  }

  @Delete('type-contract')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeContract(@Body() datas: string[]) {
    return this.contractService.sendDeleteTypeContract(datas);
  }

  // Update a type contract
  @Put('/type-contract/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateTypeContract(
    @Param('id') id: string,
    @Body() updateTypeContractDto: UpdateTypeContractDto,
  ) {
    return this.contractService.updateTypeContract({
      ...updateTypeContractDto,
      type_id: id,
    });
  }

  // Create a new contract
  @Post('/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }

  @Delete()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteContract(@Body() datas: string[]) {
    return this.contractService.sendDeleteContract(datas);
  }

  // Update an existing contract
  @Put('update/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateContract(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.updateContract({
      ...updateContractDto,
      contract_id: id,
    });
  }

  // Get all contracts
  @Get('/all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'activity', 'contract-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getContracts() {
    return this.contractService.getContracts();
  }

  @Get('/all-customer')
  async getContractsByToken(@Req() req: Request) {
    return this.contractService.getContractsByToken(req['customer'].sub);
  }

  @Get('/all-payment-customer')
  async getPaymentsByToken(@Req() req: Request) {
    return this.contractService.getPaymentsByToken(req['customer'].sub);
  }

  @Get('/payment-by-project/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllPaymentByProject(@Param('id') id: string) {
    return this.contractService.getAllPaymentByProject(id);
  }

  @Get('/about')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getContractAbout() {
    return this.contractService.getContractAbout();
  }

  @Get('/all/filter')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getYearContracts(@Query() filter?: GetFilterContractDto) {
    return this.contractService.getYearContracts(filter);
  }

  @Get('/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getContract(@Param('id') id: string) {
    return this.contractService.getContract(id);
  }

  // Create a new payment
  @Post('/payment')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'payment-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.contractService.createPayment(createPaymentDto);
  }

  @Get('/debt-supplier')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['payment', 'contract', 'admin-top', 'payment-read'])
  @SetMetadata('type', ['admin'])
  async getDebtSupplier() {
    return this.contractService.getDebtSupplier();
  }

  @Get('/payment-contract-dashboard')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['payment', 'contract', 'admin-top', 'payment-read'])
  @SetMetadata('type', ['admin'])
  async getPaymentContractDashboard() {
    return this.contractService.getPaymentContractDashboard();
  }

  @Get('/revenue-total-contract')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  async getRevenueTotalContract() {
    return this.contractService.getRevenueTotalContract();
  }

  @Get('/payment-expired-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['payment', 'contract', 'admin-top', 'payment-read'])
  @SetMetadata('type', ['admin'])
  async getPaymentExpiredCustomer() {
    return this.contractService.getPaymentExpiredCustomer();
  }

  @Get('/payment-ready-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['payment', 'contract', 'admin-top', 'payment-read'])
  @SetMetadata('type', ['admin'])
  async getPaymentReadyCustomer() {
    return this.contractService.getPaymentReadyCustomer();
  }

  @Get('/payment-ready-supplier')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['payment', 'contract', 'admin-top', 'payment-read'])
  @SetMetadata('type', ['admin'])
  async getPaymentReadySupplier() {
    return this.contractService.getPaymentReadySupplier();
  }

  @Get('/current-year')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['payment', 'contract', 'admin-top', 'contract-read'])
  @SetMetadata('type', ['admin'])
  async getYearCurrentContracts() {
    return this.contractService.getYearCurrentContracts();
  }

  @Delete('/payment')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'payment-edit', 'admin-top', 'payment'])
  @SetMetadata('type', ['admin'])
  async sendDeletePayment(@Body() datas: string[]) {
    return this.contractService.sendDeletePayment(datas);
  }

  // Update an existing payment
  @Put('/payment/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'payment-edit', 'admin-top', 'payment'])
  @SetMetadata('type', ['admin'])
  async updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.contractService.updatePayment(id, updatePaymentDto);
  }

  // Get all payments
  @Get('/payment')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', ['contract', 'payment-read', 'admin-top'])
  // @SetMetadata('type', ['admin'])
  async getAllPayments(@Query() filter?: GetFilterPaymentDto) {
    if (filter.project) {
      return this.contractService.getAllPaymentByProject(filter.project);
    }
    return this.contractService.getAllPayments(filter);
  }

  // Create a new type method
  @Post('/type-method')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'payment-edit', 'admin-top', 'payment'])
  @SetMetadata('type', ['admin'])
  async createTypeMethod(@Body() createTypeMethodDto: CreateTypeMethodDto) {
    return this.contractService.createTypeMethod(createTypeMethodDto);
  }

  @Delete('/type-method')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'payment-edit', 'admin-top', 'payment'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeMethod(@Body() datas: string[]) {
    return this.contractService.sendDeleteTypeMethod(datas);
  }

  // Update an existing type method
  @Put('/type-method/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'payment-edit', 'admin-top', 'payment'])
  @SetMetadata('type', ['admin'])
  async updateTypeMethod(
    @Param('id') id: string,
    @Body() updateTypeMethodDto: UpdateTypeMethodDto,
  ) {
    return this.contractService.updateTypeMethod(id, updateTypeMethodDto);
  }

  // Get all type methods
  @Get('/type-method')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'contract',
    'payment-read',
    'payment-edit',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  async getAllTypeMethods() {
    return this.contractService.getAllTypeMethods();
  }

  @Post('document/create')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('url'))
  async createDocumentContract(
    @Body() createDocumentContractDto: CreateDocumentContractDto,
    @UploadedFiles() url: Express.Multer.File[],
  ) {
    return this.contractService.sendCreateDocumentContract(
      createDocumentContractDto,
      url,
    );
  }

  @Delete('document/delete')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async deleteDocumentContract(@Query('id') document_id: string) {
    return this.contractService.sendDeleteDocumentContract(document_id);
  }

  @Get('document/all/:contract_id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['contract', 'contract-edit', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async getAllDocumentContract(@Param('contract_id') contract_id: string) {
    return this.contractService.sendGetAllDocumentContract(contract_id);
  }
}
