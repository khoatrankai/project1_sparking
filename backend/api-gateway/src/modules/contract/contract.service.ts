import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateDocumentContractDto } from './dto/DocumentContractDto/create-document_contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CONTRACT') private readonly contractClient: ClientProxy,
    private readonly cloudinaryService: CloudinaryService,
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
      this.contractClient.send({cmd:'delete-type_contract'}, datas),
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
      this.contractClient.send({cmd:'delete-contract'}, datas),
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

  async getContractsByToken(customer_id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-contracts_by_token' }, customer_id),
    );
  }

  async getPaymentsByToken(customer_id: string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payments_by_token' }, customer_id),
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

  async getPaymentReadyCustomerOfCustomer(customer_id:string) {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment_ready_customer_of_customer' }, customer_id),
    );
  }

  async getPaymentReadySupplier() {
    return firstValueFrom(
      this.contractClient.send({ cmd: 'get-payment_ready_supplier' }, {}),
    );
  }

  async sendDeletePayment(datas: string[]) {
    return await firstValueFrom(
      this.contractClient.send({cmd:'delete-payment'}, datas),
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
      this.contractClient.send({cmd:'delete-type_method'}, datas),
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

  async sendDeleteDocumentContract(document_id: string) {
    const dataDelete = await firstValueFrom(
      this.contractClient.send({cmd:'delete-document_contract'}, document_id),
    );
    if (dataDelete.data) {
      const data = await this.cloudinaryService.deleteFile(dataDelete.data);
      if (data) {
        return {
          statusCode: dataDelete.statusCode,
          message: dataDelete.message,
        };
      }
    }
    return dataDelete;
  }

  async sendCreateDocumentContract(
    createDocumentContractDto: CreateDocumentContractDto,
    picture_urls: Express.Multer.File[],
  ) {
    try {
      // //console.log(picture_urls)
      if (picture_urls && picture_urls.length > 0) {
        const type = picture_urls?.[0]?.originalname.split('.').pop();
        const datas = await this.cloudinaryService.uploadFiles(picture_urls);
        if (datas.length > 0) {
          const resultImg = await firstValueFrom(
            this.contractClient.send('create-one-document_contract', {
              ...createDocumentContractDto,
              url: datas[0],
              type,
            }),
          );
          if (resultImg) {
            return {
              statusCode: HttpStatus.CREATED,
              message: 'Contract and Document created successfully',
            };
          }
        }
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Document dont successfully',
        };
      }
    } catch (err) {
      //console.log(err);
    }
  }

  async sendGetAllDocumentContract(contract_id: string) {
    return await firstValueFrom(
      this.contractClient.send('get-all_document_contract', contract_id),
    );
  }

  async sendGetDashboardTotalbyProject(project_id: string) {
    return await firstValueFrom(
      this.contractClient.send({cmd:'get-dashboard_by_project'}, project_id),
    );
  }

  async sendGetContractFilterbyProject(filter: {id:string}) {
    return await firstValueFrom(
      this.contractClient.send({cmd:'get-contract_filter_by_project'}, filter),
    );
  }
}
