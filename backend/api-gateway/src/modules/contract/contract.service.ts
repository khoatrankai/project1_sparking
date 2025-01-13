import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreateContractDto } from './dto/ContractDto/create_contract.dto';
import { UpdateContractDto } from './dto/ContractDto/update_contract.dto';
import { CreatePaymentDto } from './dto/PaymentDto/create-payment.dto';
import { UpdatePaymentDto } from './dto/PaymentDto/update-payment.dto';
import { CreateTypeContractDto } from './dto/TypeContractDto/create_type_contract.dto';
import { UpdateTypeContractDto } from './dto/TypeContractDto/update_type_contract.dto';
import { CreateTypeMethodDto } from './dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from './dto/TypeMethodDto/update-type_method.dto';
import { GetFilterPaymentDto } from './dto/PaymentDto/get-filter.dto';
import { GetFilterContractDto } from './dto/ContractDto/get-filter.dto';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT') private readonly contractClient: ClientProxy,
  ) {}
  getHello() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-revenue_total_contract' }, {}),
    );
  }

  async createTypeContract(createTypeContractDto: CreateTypeContractDto) {
    return firstValueFrom(
      this.contractClient.send(
        { cmd: 'create-type_contract' },
        createTypeContractDto,
      ),
    );
  }

  async sendDeleteTypeContract(datas: string[]) {
    return await firstValueFrom(
      this.contractClient.send('delete-type_contract', datas),
    );
  }

  async getTypeContracts() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-type_contracts' }, {}),
    );
  }

  async getYearCurrentContracts() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-contract_current_year' }, {}),
    );
  }

  async getRevenueTotalContract() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-revenue_total_contract' }, {}),
    );
  }

  async getFullContractDashboard() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-full_contract_dashboard' }, {}),
    );
  }

  async getFullContractByTypeID(id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-full_contract_by_type_id' }, id),
    );
  }

  async getFullTypeContracts() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-type-full_contracts' }, {}),
    );
  }

  async updateTypeContract(updateTypeContractDto: UpdateTypeContractDto) {
    return firstValueFrom(
      this.contractClient.send(
        { cmd: 'update-type_contract' },
        updateTypeContractDto,
      ),
    );
  }

  async createContract(createContractDto: CreateContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'create-contract' }, createContractDto),
    );
  }

  async sendDeleteContract(datas: string[]) {
    return await firstValueFrom(
      this.contractClient.send('delete-contract', datas),
    );
  }

  async updateContract(updateContractDto: UpdateContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'update-contract' }, updateContractDto),
    );
  }

  async getContracts() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-contracts' }, {}),
    );
  }

  async getContractAbout() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-contract_about' }, {}),
    );
  }

  async getYearContracts(filter?: GetFilterContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-year_contracts' }, filter),
    );
  }

  async getAllPaymentByProject(project: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payments_by_project' }, project),
    );
  }

  async getContract(id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-contract' }, id),
    );
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'create-payment' }, createPaymentDto),
    );
  }

  async getPaymentContractDashboard() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment_dashboard' }, {}),
    );
  }

  async getPaymentExpiredCustomer() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment_expired_customer' }, {}),
    );
  }

  async getPaymentReadyCustomer() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment_ready_customer' }, {}),
    );
  }

  async getPaymentReadySupplier() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment_ready_supplier' }, {}),
    );
  }

  async sendDeletePayment(datas: string[]) {
    return await firstValueFrom(
      this.contractClient.send('delete-payment', datas),
    );
  }

  async updatePayment(payment_id: string, updatePaymentDto: UpdatePaymentDto) {
    return firstValueFrom(
      this.contractClient.send(
        { cmd: 'update-payment' },
        { payment_id, updatePaymentDto },
      ),
    );
  }

  async getPayment(payment_id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment' }, payment_id),
    );
  }

  async getDebtSupplier() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-debt_supplier' }, {}),
    );
  }

  async getAllPayments(filter?: GetFilterPaymentDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-all-payments' }, filter),
    );
  }

  async createTypeMethod(createTypeMethodDto: CreateTypeMethodDto) {
    return firstValueFrom(
      this.contractClient.send(
        { cmd: 'create-type_method' },
        createTypeMethodDto,
      ),
    );
  }

  async sendDeleteTypeMethod(datas: string[]) {
    return await firstValueFrom(
      this.contractClient.send('delete-type_method', datas),
    );
  }

  async updateTypeMethod(
    type_method_id: string,
    updateTypeMethodDto: UpdateTypeMethodDto,
  ) {
    return firstValueFrom(
      this.contractClient.send(
        { cmd: 'update-type_method' },
        { type_method_id, updateTypeMethodDto },
      ),
    );
  }

  async getTypeMethod(type_method_id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-type_method' }, type_method_id),
    );
  }

  async getAllTypeMethods() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-all-type_methods' }, {}),
    );
  }
}
