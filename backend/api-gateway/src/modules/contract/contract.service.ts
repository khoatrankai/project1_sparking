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


@Injectable()
export class ContractService {

  constructor(@Inject('CONTRACT') private readonly contractClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async createTypeContract(createTypeContractDto: CreateTypeContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'create-type_contract' }, createTypeContractDto)
    );
  }

  async getTypeContracts() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-type_contracts' }, {})
    );
  }

  async updateTypeContract(updateTypeContractDto: UpdateTypeContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'update-type_contract' }, updateTypeContractDto)
    );
  }

  async createContract(createContractDto: CreateContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'create-contract' }, createContractDto)
    );
  }

  async updateContract(updateContractDto: UpdateContractDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'update-contract' }, updateContractDto)
    );
  }

  async getContracts() {
    return firstValueFrom(this.contractClient.send({ cmd: 'get-contracts' }, {}));
  }

  async getContract(id:string) {
    return firstValueFrom(this.contractClient.send({ cmd: 'get-contract' }, id));
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'create-payment' }, createPaymentDto)
    );
  }

  async updatePayment(payment_id: string, updatePaymentDto: UpdatePaymentDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'update-payment' }, { payment_id, updatePaymentDto })
    );
  }

  async getPayment(payment_id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment' }, payment_id)
    );
  }

  async getAllPayments() {
    return firstValueFrom(this.contractClient.send({ cmd: 'get-all-payments' }, {}));
  }

 
  async createTypeMethod(createTypeMethodDto: CreateTypeMethodDto) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'create-type_method' }, createTypeMethodDto)
    );
  }

  async updateTypeMethod(type_method_id: string, updateTypeMethodDto: UpdateTypeMethodDto) {
    return firstValueFrom(
      this.contractClient.send(
        { cmd: 'update-type_method' },
        { type_method_id, updateTypeMethodDto }
      )
    );
  }

  async getTypeMethod(type_method_id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-type_method' }, type_method_id)
    );
  }

  async getAllTypeMethods() {
    return firstValueFrom(this.contractClient.send({ cmd: 'get-all-type_methods' }, {}));
  }

  
 
}
