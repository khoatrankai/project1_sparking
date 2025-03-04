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
import { GetFilterPaymentDto } from 'src/dto/PaymentDto/get-filter.dto';
import { GetFilterContractDto } from 'src/dto/ContractDto/get-filter.dto';
import { CreateDocumentContractDto } from 'src/dto/DocumentContractDto/create-document_contract.dto';

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
  async createTypeContract(
    @Payload() createTypeContract: CreateTypeContractDto,
  ) {
    return this.contractService.createTypeContract(createTypeContract);
  }

  @MessagePattern({ cmd: 'delete-type_contract' })
  async deleteTypeContract(@Payload() datas: string[]) {
    return this.contractService.deleteTypeContracts(datas);
  }

  @MessagePattern({ cmd: 'get-type_contracts' })
  async getTypeContract() {
    return this.contractService.getAllTypeContracts();
  }

  @MessagePattern({ cmd: 'get-full_contract_dashboard' })
  async getFullContractDashboard() {
    return this.contractService.getFullContractDashboard();
  }

  @MessagePattern({ cmd: 'get-full_contract_by_type_id' })
  async getFullContractByIDType(id: string) {
    return this.contractService.getFullContractByIDType(id);
  }

  @MessagePattern({ cmd: 'get-type-full_contracts' })
  async getTypeFullContract() {
    return this.contractService.getFullTypeContracts();
  }

  @MessagePattern({ cmd: 'update-type_contract' })
  async updateTypeContract(
    @Payload() updateTypeContract: UpdateTypeContractDto,
  ) {
    return this.contractService.updateTypeContract(updateTypeContract);
  }

  // Contract patterns
  @MessagePattern({ cmd: 'create-contract' })
  async createContract(@Payload() createContract: CreateContractDto) {
    return this.contractService.createContract(createContract);
  }

  @MessagePattern({ cmd: 'delete-contract' })
  async deleteContract(@Payload() datas: string[]) {
    return this.contractService.deleteContract(datas);
  }

  @MessagePattern({ cmd: 'update-contract' })
  async updateContract(@Payload() updateContract: UpdateContractDto) {
    return this.contractService.updateContract(updateContract);
  }

  @MessagePattern({ cmd: 'get-contracts' })
  async getContracts() {
    return this.contractService.getContracts();
  }

  @MessagePattern({ cmd: 'get-contract_about' })
  async getContractAbout() {
    return this.contractService.getContractAbout();
  }

  @MessagePattern({ cmd: 'get-year_contracts' })
  async getYearContracts(filter?: GetFilterContractDto) {
    return this.contractService.getYearContracts(filter);
  }

  @MessagePattern({ cmd: 'get-contract' })
  async getContract(@Payload() id: string) {
    return this.contractService.getContractID(id);
  }

  @MessagePattern({ cmd: 'get-contract_ids' })
  async getContractIds(data: string[]) {
    return this.contractService.getContractIDs(data);
  }

  @MessagePattern({ cmd: 'get-contract_by_project_id' })
  async getContractByProject(project: string) {
    return this.contractService.getContractByProject(project);
  }

  @MessagePattern({ cmd: 'get-contracts_by_token' })
  async getAllContractByToken(customer_id: string) {
    return this.contractService.getAllContractByToken(customer_id);
  }

  @MessagePattern({ cmd: 'get-payments_by_token' })
  async getAllPaymentByToken(customer_id: string) {
    return this.contractService.getAllPaymentByToken(customer_id);
  }

  // Payment patterns
  @MessagePattern({ cmd: 'create-payment' })
  async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.contractService.createPayment(createPaymentDto);
  }

  @MessagePattern({ cmd: 'delete-payment' })
  async deletePayment(@Payload() datas: string[]) {
    return this.contractService.deletePayment(datas);
  }

  @MessagePattern({ cmd: 'update-payment' })
  async updatePayment(
    @Payload() data: { payment_id: string; updatePaymentDto: UpdatePaymentDto },
  ) {
    return this.contractService.updatePayment(
      data.payment_id,
      data.updatePaymentDto,
    );
  }

  @MessagePattern({ cmd: 'get-payment' })
  async getPayment(@Payload() payment_id: string) {
    return this.contractService.getPayment(payment_id);
  }

  @MessagePattern({ cmd: 'get-debt_supplier' })
  async getDebtSupplier() {
    return this.contractService.getDebtSupplier();
  }

  @MessagePattern({ cmd: 'get-payment_dashboard' })
  async getInfoPaymentDashboard() {
    return this.contractService.getInfoPaymentDashboard();
  }

  @MessagePattern({ cmd: 'get-revenue_total_contract' })
  async getRevenueTotalContract() {
    return this.contractService.getRevenueTotalContract();
  }

  @MessagePattern({ cmd: 'get-contract_current_year' })
  async getYearCurrentContracts() {
    return this.contractService.getYearCurrentContracts();
  }

  @MessagePattern({ cmd: 'get-payment_expired_customer' })
  async getExpiredCustomer() {
    return this.contractService.getExpiredCustomer();
  }

  @MessagePattern({ cmd: 'get-payment_ready_customer' })
  async getPaymentReadyCustomer() {
    return this.contractService.getPaymentReadyCustomer();
  }

  @MessagePattern({ cmd: 'get-payment_ready_supplier' })
  async getPaymentReadySupplier() {
    return this.contractService.getPaymentReadySupplier();
  }

  @MessagePattern({ cmd: 'get-all-payments' })
  async getAllPayments(@Payload() filter?: GetFilterPaymentDto) {
    return this.contractService.getAllPayments(filter);
  }

  @MessagePattern({ cmd: 'get-payments_by_project' })
  async getPaymentByProject(project: string) {
    return this.contractService.getPaymentByProject(project);
  }

  @MessagePattern({ cmd: 'create-type_method' })
  async createTypeMethod(@Payload() createTypeMethodDto: CreateTypeMethodDto) {
    return this.contractService.createTypeMethod(createTypeMethodDto);
  }

  @MessagePattern({ cmd: 'delete-type_method' })
  async deleteTypeMethod(@Payload() datas: string[]) {
    return this.contractService.deleteTypeMethod(datas);
  }

  @MessagePattern({ cmd: 'update-type_method' })
  async updateTypeMethod(
    @Payload()
    data: {
      type_method_id: string;
      updateTypeMethodDto: UpdateTypeMethodDto;
    },
  ) {
    return this.contractService.updateTypeMethod(
      data.type_method_id,
      data.updateTypeMethodDto,
    );
  }

  @MessagePattern({ cmd: 'get-type_method' })
  async getTypeMethod(@Payload() type_method_id: string) {
    return this.contractService.getTypeMethod(type_method_id);
  }

  @MessagePattern({ cmd: 'get-all-type_methods' })
  async getAllTypeMethods() {
    return this.contractService.getAllTypeMethods();
  }

  @MessagePattern('create-document_contract')
  async createDocumentContract(
    @Payload() createDocumentContractDto: CreateDocumentContractDto[],
  ) {
    return await this.contractService.createDocumentContract(
      createDocumentContractDto,
    );
  }

  @MessagePattern('create-one-document_contract')
  async createOnePictureActivity(
    @Payload() createDocumentContractDto: CreateDocumentContractDto,
  ) {
    return await this.contractService.createOneDocumentContract(
      createDocumentContractDto,
    );
  }

  @MessagePattern('delete-document_contract')
  async deleteDocumentContract(@Payload() document_id: string) {
    return await this.contractService.deleteDocumentContract(document_id);
  }

  @MessagePattern('get-all_document_contract')
  async getAllDocumentContract(@Payload() contract_id: string) {
    return await this.contractService.getAllDocumentContract(contract_id);
  }

  @MessagePattern({ cmd: 'get-opportunity_by_contract' })
  async getOpportunityByContract() {
    return this.contractService.getOpportunityByContract();
  }

  @MessagePattern({ cmd: 'get-contract_by_opportunity' })
  async getContractsByOpportunityID(opportunity_id:string) {
    return this.contractService.getContractsByOpportunityID(opportunity_id);
  }

  @MessagePattern({ cmd: 'get-dashboard_by_project' })
  async getDashboardContractByProject(project_id) {
    return this.contractService.getDashboardContractByProject(project_id);
  }
}
