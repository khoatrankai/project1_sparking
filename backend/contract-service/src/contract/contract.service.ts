import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Contract } from 'src/database/entities/contract.entity';
import { CreateTypeContractDto } from 'src/dto/TypeContractDto/create_type_contract.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { getYear, getMonth } from 'date-fns';
import {
  Between,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { TypeContract } from 'src/database/entities/type_contract.entity';
import { UpdateTypeContractDto } from 'src/dto/TypeContractDto/update_type_contract.dto';
import { UpdateContractDto } from 'src/dto/ContractDto/update_contract.dto';
import { CreatePaymentDto } from 'src/dto/PaymentDto/create-payment.dto';
import { Payment } from 'src/database/entities/payment.entity';
import { UpdatePaymentDto } from 'src/dto/PaymentDto/update-payment.dto';
import { TypeMethod } from 'src/database/entities/type_method.entity';
import { CreateTypeMethodDto } from 'src/dto/TypeMethodDto/create-type_method.dto';
import { UpdateTypeMethodDto } from 'src/dto/TypeMethodDto/update-type_method.dto';
import { CreateContractDto } from 'src/dto/ContractDto/create_contract.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetFilterPaymentDto } from 'src/dto/PaymentDto/get-filter.dto';
import { GetFilterContractDto } from 'src/dto/ContractDto/get-filter.dto';
import { CreateDocumentContractDto } from 'src/dto/DocumentContractDto/create-document_contract.dto';
import { DocumentContract } from 'src/database/entities/document_contract.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContractService {
  constructor(
    @Inject('CUSTOMER') private readonly customersClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
    @Inject('PRODUCT') private readonly productsClient: ClientProxy,
    @Inject('PROJECT') private readonly projectsClient: ClientProxy,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(DocumentContract)
    private readonly documentContractRepository: Repository<DocumentContract>,
    @InjectRepository(TypeContract)
    private readonly typeContractRepository: Repository<TypeContract>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(TypeMethod)
    private typeMethodRepository: Repository<TypeMethod>,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  // Create a new TypeContract
  async createTypeContract(createTypeContract: CreateTypeContractDto) {
    try {
      const id = uuidv4();
      const dataNew = this.typeContractRepository.create({
        ...createTypeContract,
        type_id: id,
      });
      await this.typeContractRepository.save(dataNew);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'TypeContract created successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create TypeContract',
      };
    }
  }

  async deleteTypeContracts(datas: string[]) {
    try {
      const rm = await this.typeContractRepository.delete({
        type_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  // Update an existing TypeContract
  async updateTypeContract(updateTypeContract: UpdateTypeContractDto) {
    try {
      await this.typeContractRepository.update(
        updateTypeContract.type_id,
        updateTypeContract,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'TypeContract updated successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update TypeContract',
      };
    }
  }

  // Create a new Contract
  async createContract(createContract: CreateContractDto) {
    try {
      const id = uuidv4();
      const typeContract = await this.typeContractRepository.findOne({
        where: { type_id: createContract.type_contract },
      });
      const dataNew = this.contractRepository.create({
        ...createContract,
        contract_id: id,
        type_contract: typeContract,
      });
      await this.contractRepository.save(dataNew);
      await firstValueFrom(
        this.userClient.emit(
          { cmd: 'create-notify' },
          {
            description: 'Thông báo có hợp đồng mới',
            link: `${this.configService.get<string>('DOMAIN')}/admin/contract?id=${id}`,
            notify_role: ['admin-top', 'contract'],
          },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Contract created successfully',
      };
    } catch {
      //console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Contract',
      };
    }
  }

  async deleteContract(datas: string[]) {
    try {
      const rm = await this.contractRepository.delete({
        contract_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  // Update an existing Contract
  async updateContract(updateContract: UpdateContractDto) {
    try {
      const typeContract = await this.typeContractRepository.findOne({
        where: { type_id: updateContract.type_contract },
      });
      if(updateContract.status === "completed"){
        await this.contractRepository.update(updateContract.contract_id, {
          ...updateContract,
          type_contract: typeContract,
          date_completed:new Date()
        });
      }else{
        await this.contractRepository.update(updateContract.contract_id, {
          ...updateContract,
          type_contract: typeContract,
        });
      }
     
      return {
        statusCode: HttpStatus.OK,
        message: 'Contract updated successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update Contract',
      };
    }
  }

  // Get all Contracts
  async getContracts() {
    const result = await this.contractRepository.find({
      relations: ['type_contract'],
      order: { created_at: 'DESC' },
    });
    const customerIds = result.map((dt) => dt.customer);
    const customerInfos = await firstValueFrom(
      this.customersClient.send({ cmd: 'get-customer_ids' }, customerIds),
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Contracts retrieved successfully',
      data: result.map((dt, index) => {
        return { ...dt, customer: customerInfos[index] };
      }),
    };
  }

  async getOpportunityByContract(){
    const dataContracts = await this.contractRepository.find()
    const projectIds =dataContracts.map(dt =>dt.project)
    const opportunities = await firstValueFrom(this.projectsClient.send({cmd:'get-opportunity-by-project'},projectIds))
    return opportunities

    
  }

  async getContractsByOpportunityID(opportunity_id:string){
    const projectIds = await firstValueFrom(this.projectsClient.send({cmd:'get-project-by-opportunity-id'},opportunity_id))
    const contracts = await this.contractRepository.find({where:{project:In(projectIds)}})
    return {
      statusCode:HttpStatus.OK,
      data:contracts
    }
  }

  async getAllContractByToken(customer_id: string) {
    try {
      const resInfo = await firstValueFrom(
        this.customersClient.send(
          { cmd: 'get-all_customer_by_token' },
          customer_id,
        ),
      );
      if (resInfo.statusCode === 200 && resInfo.data.length > 0) {
        const idsInfo = resInfo.data.map((dt: any) => dt.customer_id);
        const data = await this.contractRepository.find({
          where: { customer: In(idsInfo) },
          relations: ['type_contract'],
        });
        return {
          statusCode: HttpStatus.OK,
          data: data.map((dt) => {
            return {
              ...dt,
              customer: resInfo.data.find(
                (dtt: any) => dtt.customer_id === dt.customer,
              ),
            };
          }),
          message: 'Contract retrieved successfully',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: [],
        message: 'Contract retrieved successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi rồi',
      };
    }
  }

  async getAllPaymentByToken(customer_id: string) {
    try {
      const resInfo = await firstValueFrom(
        this.customersClient.send(
          { cmd: 'get-all_customer_by_token' },
          customer_id,
        ),
      );
      if (resInfo.statusCode === 200 && resInfo.data.length > 0) {
        const idsInfo = resInfo.data.map((dt: any) => dt.customer_id);
        const data = await this.paymentRepository
          .createQueryBuilder('payment')
          .leftJoinAndSelect('payment.contract', 'contract')
          .where('contract.project IN (:...projects)', { projects: idsInfo })
          .getMany();
        return {
          statusCode: HttpStatus.OK,
          data: data,
          message: 'Contract retrieved successfully',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: [],
        message: 'Contract retrieved successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi rồi',
      };
    }
  }

  async getContractAbout() {
    const today = new Date();
    const weekDate = new Date();
    weekDate.setDate(today.getDate() + 7);
    const contractTotal = await this.contractRepository.count({
      where: { status: Not('delete') },
    });
    const contractActive = await this.contractRepository.count({
      where: { status: In(['active']), date_expired: MoreThanOrEqual(today) },
    });
    const contractReadyExpired = await this.contractRepository.count({
      where: { status: In(['active']), date_expired: Between(today, weekDate) },
    });
    const contractExpired = await this.contractRepository.count({
      where: { status: In(['active']), date_expired: LessThan(today) },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Contracts retrieved successfully',
      data: {
        contractActive,
        contractExpired,
        contractReadyExpired,
        contractTotal,
      },
    };
  }

  async getYearContracts(filter?: GetFilterContractDto) {
    const year = filter.year ?? null;
    const customer = filter.customer ?? null;

    const whereCondition: any = {};
    if (customer) {
      whereCondition.customer = customer;
    }

    if (year) {
      const result = await this.contractRepository.find({
        where: {
          ...whereCondition,
          date_expired: MoreThanOrEqual(new Date(`${year}-01-01`)),
        },
        relations: ['type_contract'],
      });
      const projectIds = result.map((dt) => dt.project);
      const projectInfos = await firstValueFrom(
        this.projectsClient.send({ cmd: 'get-project_ids' }, projectIds),
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Contracts retrieved successfully',
        data: result
          .map((dt, index) => {
            return { ...dt, project: projectInfos[index] };
          })
          .sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          ),
      };
    } else {
      const result = await this.contractRepository.find({
        where: whereCondition,
        relations: ['type_contract'],
      });
      const projectIds = result.map((dt) => dt.project);
      const projectInfos = await firstValueFrom(
        this.projectsClient.send({ cmd: 'get-project_ids' }, projectIds),
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Contracts retrieved successfully',
        data: result
          .map((dt, index) => {
            return { ...dt, project: projectInfos[index] };
          })
          .sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          ),
      };
    }
  }

  async getYearCurrentContracts() {
    const result = await this.contractRepository
      .createQueryBuilder('contract')
      .where('YEAR(contract.created_at) = :year', {
        year: new Date().getFullYear(),
      })
      .orderBy('contract.price', 'DESC')
      .getMany();
    // const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_id'},result.customer))
    return {
      statusCode: HttpStatus.OK,
      message: 'Contracts retrieved successfully',
      data: result,
    };
  }

  async getContractID(id: string) {
    try{
      const result = await this.contractRepository.findOne({
        where: { contract_id: id },
        relations: ['type_contract'],
      });
      // const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_id'},result.customer))
      return {
        statusCode: HttpStatus.OK,
        message: 'Contracts retrieved successfully',
        data: { ...result, type_contract: result.type_contract ? result.type_contract.type_id : null },
      };
    }catch{
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Contracts retrieved fail',
      }
    }
    
  }
  async getContractIDs(contract_ids: string[]) {
    if (!contract_ids || contract_ids.length === 0) {
      return [];
    }
    const data = await this.contractRepository.find({
      where: { contract_id: In(contract_ids) },
    });
    const sortedData = contract_ids.map((id) =>
      data.find((contract) => contract.contract_id === id),
    );
    return sortedData;
  }

  async getContractByProject(project: string) {
    const data = await this.contractRepository.find({
      where: { project: project },
      select: { contract_id: true },
      order: { created_at: 'DESC' },
    });

    return data.map((dt) => dt.contract_id);
  }

  async getPaymentByProject(project: string) {
    const data = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.contract', 'contract')
      .where('contract.project = :project', { project })
      .getMany();

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  // async getContracts() {
  //   const result = await this.contractRepository.find({relations:['type_contract']});
  //   const customerIds = result.map((dt)=> dt.customer)
  //   const customerInfos = await firstValueFrom(this.customersClient.send({cmd:'get-customer_ids'},customerIds))
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Contracts retrieved successfully',
  //     data: result.map((dt,index)=>{
  //       return {...dt,customer:customerInfos[index]}
  //     }),
  //   };
  // }

  // Create a new Payment
  async createPayment(createPaymentDto: CreatePaymentDto) {
    try {
      const contract = await this.contractRepository.findOne({
        where: { contract_id: createPaymentDto.contract },
      });
      const type_method = await this.typeMethodRepository.findOne({
        where: { type_method_id: createPaymentDto.type_method },
      });
      const payment = this.paymentRepository.create({
        ...createPaymentDto,
        payment_id: uuidv4(),
        contract,
        type_method,
      });
      await this.paymentRepository.save(payment);
      await firstValueFrom(
        this.userClient.emit(
          { cmd: 'create-notify' },
          {
            description: 'Thông báo có hóa đơn mới',
            link: `${this.configService.get<string>('DOMAIN')}/admin/payment?id=${payment.payment_id}`,
            notify_role: ['admin-top', 'contract', 'payment'],
          },
        ),
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Payment created successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Payment',
      };
    }
  }

  async deletePayment(datas: string[]) {
    try {
      const rm = await this.paymentRepository.delete({ payment_id: In(datas) });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  // Update an existing Payment
  async updatePayment(payment_id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const contract = await this.contractRepository.findOneBy({
        contract_id: updatePaymentDto.contract ?? '',
      });
      const type_method = await this.typeMethodRepository.findOneBy({
        type_method_id: updatePaymentDto.type_method ?? '',
      });
      await this.paymentRepository.update(payment_id, {
        ...updatePaymentDto,
        contract,
        type_method,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Payment updated successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update Payment',
      };
    }
  }

  // Get a Payment by ID
  async getPayment(payment_id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id },
      relations: ['contract'],
    });
    if (!payment) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Payment with ID ${payment_id} not found`,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Payment retrieved successfully',
      data: payment,
    };
  }

  // Get all Payments
  async getAllPayments(filter?: GetFilterPaymentDto) {
    const type = filter.type ?? null;
    const customer = filter.customer ?? null;
    const supplier = filter.supplier ?? null;
    const contract = customer
      ? (
          await this.contractRepository.find({
            where: { customer: customer },
          })
        ).map((dt) => dt.contract_id)
      : filter.contract
        ? filter.contract
        : null;
    const date_start = filter.date_start
      ? new Date(Number(filter.date_start))
      : null;
    const date_end = filter.date_end ? new Date(Number(filter.date_end)) : null;
    const status = filter.status ?? null;

    const whereCondition: any = {};
    if (contract) {
      whereCondition.contract = !customer
        ? In([contract])
        : In(contract as string[]);
    }
    if (type) {
      whereCondition.type = type;
    }

    if (supplier) {
      whereCondition.supplier = supplier;
    }

    if (['expired', 'ready'].includes(status)) {
      if (status === 'expired') {
        const today = new Date();
        whereCondition.date_expired = LessThanOrEqual(today);
      } else {
        const today = new Date();
        const weekDate = new Date();
        weekDate.setDate(today.getDate() + 7);
        whereCondition.date_expired = Between(today, weekDate);
      }
    } else {
      whereCondition.status = status;
      if (filter.export) {
        if (date_start || date_end) {
          if (date_start && date_end) {
            whereCondition.created_at = Between(date_start, date_end);
          } else {
            if (date_start) {
              whereCondition.created_at = MoreThanOrEqual(date_start);
            }
            if (date_end) {
              whereCondition.created_at = LessThanOrEqual(date_end);
            }
          }
        }
      } else {
        if (date_start || date_end) {
          if (date_start && date_end) {
            whereCondition.date_expired = Between(date_start, date_end);
          } else {
            if (date_start) {
              whereCondition.date_expired = MoreThanOrEqual(date_start);
            }
            if (date_end) {
              whereCondition.date_expired = LessThanOrEqual(date_end);
            }
          }
        }
      }
    }

    const result = await this.paymentRepository.find({
      where: whereCondition,
      relations: ['contract'],
      order:
        filter.status === 'success'
          ? { created_at: 'ASC' }
          : { date_expired: 'ASC' },
    });
    const dataSuppliers = await firstValueFrom(
      this.productsClient.send(
        { cmd: 'find-all_supplier_ids' },
        result.map((dt) => dt.supplier),
      ),
    );
    const dataTypeProducts = await firstValueFrom(
      this.productsClient.send(
        { cmd: 'find-all_type_ids' },
        result.map((dt) => dt.type_product),
      ),
    );
    const dataProjects = await firstValueFrom(
      this.projectsClient.send(
        { cmd: 'get-project_ids' },
        result.map((dt) => dt.contract.project),
      ),
    );
    const dataCustomerInfos = await firstValueFrom(
      this.customersClient.send(
        { cmd: 'get-customer_ids' },
        result.map((dt) => dt.contract.customer),
      ),
    );
    if (!filter.export) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Payments retrieved successfully',
        data: result.map((dt, index) => {
          return {
            ...dt,
            type_product: dataTypeProducts[index],
            supplier: dataSuppliers[index],
            contract: {
              ...dt.contract,
              project: dataProjects[index],
              customer: dataCustomerInfos[index],
            },
          };
        }),
      };
    }
    if (filter.typeDate === 'month') {
      return {
        statusCode: HttpStatus.OK,
        message: 'Payments retrieved successfully',
        data: result.map((dt, index) => {
          const timeEnd = new Date(dt.created_at);
          const month = getMonth(timeEnd) + 1; // Lấy tháng
          const year = getYear(timeEnd); // Lấy năm
          return {
            ...dt,
            type_product: dataTypeProducts[index],
            supplier: dataSuppliers[index],
            contract: {
              ...dt.contract,
              project: dataProjects[index],
              customer: dataCustomerInfos[index],
            },
            date: `${month}/${year}`,
          };
        }),
      };
    }
    if (filter.typeDate === 'quarter') {
      return {
        statusCode: HttpStatus.OK,
        message: 'Payments retrieved successfully',
        data: result.map((dt, index) => {
          const timeEnd = new Date(dt.created_at);
          const month = getMonth(timeEnd) + 1; // Lấy tháng
          const quarter = Math.ceil(month / 3);
          const year = getYear(timeEnd); // Lấy năm
          return {
            ...dt,
            type_product: dataTypeProducts[index],
            supplier: dataSuppliers[index],
            contract: {
              ...dt.contract,
              project: dataProjects[index],
              customer: dataCustomerInfos[index],
            },
            date: `${quarter}/${year}`,
          };
        }),
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Payments retrieved successfully',
      data: result.map((dt, index) => {
        const timeEnd = new Date(dt.created_at);
        const year = getYear(timeEnd); // Lấy năm
        return {
          ...dt,
          type_product: dataTypeProducts[index],
          supplier: dataSuppliers[index],
          contract: {
            ...dt.contract,
            project: dataProjects[index],
            customer: dataCustomerInfos[index],
          },
          date: `${year}`,
        };
      }),
    };
  }

  // Create a new TypeMethod
  async createTypeMethod(createTypeMethodDto: CreateTypeMethodDto) {
    try {
      const typeMethod = this.typeMethodRepository.create({
        ...createTypeMethodDto,
        type_method_id: uuidv4(),
      });
      await this.typeMethodRepository.save(typeMethod);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'TypeMethod created successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create TypeMethod',
      };
    }
  }

  async deleteTypeMethod(datas: string[]) {
    try {
      const rm = await this.typeMethodRepository.delete({
        type_method_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  // Update an existing TypeMethod
  async updateTypeMethod(
    type_method_id: string,
    updateTypeMethodDto: UpdateTypeMethodDto,
  ) {
    try {
      await this.typeMethodRepository.update(
        type_method_id,
        updateTypeMethodDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'TypeMethod updated successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update TypeMethod',
      };
    }
  }

  // Get a TypeMethod by ID
  async getTypeMethod(type_method_id: string) {
    const typeMethod = await this.typeMethodRepository.findOne({
      where: { type_method_id },
    });
    if (!typeMethod) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `TypeMethod with ID ${type_method_id} not found`,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeMethod retrieved successfully',
      data: typeMethod,
    };
  }

  // Get all TypeMethods
  async getAllTypeMethods() {
    const result = await this.typeMethodRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeMethods retrieved successfully',
      data: result,
    };
  }

  // Get a TypeContract by ID
  async getTypeContract(type_id: string) {
    const typeContract = await this.typeContractRepository.findOne({
      where: { type_id },
    });
    if (!typeContract) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `TypeContract with ID ${type_id} not found`,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContract retrieved successfully',
      data: typeContract,
    };
  }

  // Get all TypeContracts
  async getAllTypeContracts() {
    const result = await this.typeContractRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContracts retrieved successfully',
      data: result,
    };
  }

  async getFullContractDashboard() {
    const currentYear = new Date().getFullYear();
    const result = await this.typeContractRepository
      .createQueryBuilder('typeContract')
      .leftJoin('typeContract.contracts', 'contracts')
      .where('YEAR(contracts.created_at) = :currentYear', { currentYear })
      .select('typeContract.name_type', 'name_type')
      .addSelect('typeContract.type_id', 'type_id')
      .addSelect('SUM(contracts.price)', 'total')
      .groupBy('name_type')
      .getRawMany();
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContracts retrieved successfully',
      data: result,
    };
  }

  async getFullContractByIDType(id: string) {
    const currentYear = new Date().getFullYear();
    const result = await this.typeContractRepository
      .createQueryBuilder('typeContract')
      .leftJoin('typeContract.contracts', 'contracts')
      .where(
        'YEAR(contracts.created_at) = :currentYear AND typeContract.type_id = :typeID',
        { currentYear, typeID: id },
      )
      .select('contracts.name_contract', 'name_contract')
      .addSelect('contracts.contract_id', 'contract_id')
      .addSelect('contracts.price', 'total')
      .getRawMany();
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContracts retrieved successfully',
      data: result,
    };
  }

  async getFullTypeContracts() {
    const result = await this.typeContractRepository.find({
      relations: ['contracts'],
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContracts retrieved successfully',
      data: result,
    };
  }

  async getDebtSupplier() {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .where('payment.type = "import" AND payment.status = "pending"')
      .select('payment.supplier', 'supplier')
      .addSelect('SUM(payment.price)', 'total')
      .groupBy('supplier')
      .orderBy('total', 'DESC')
      .getRawMany();
    const idsSupplier = result.map((dt) => dt.supplier);

    const supplier = await firstValueFrom(
      this.productsClient.send({ cmd: 'find-all_supplier_ids' }, idsSupplier),
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'TypeContracts retrieved successfully',
      data: result.map((dt, index) => {
        return {
          supplier: supplier?.[index]?.name,
          total: Number(dt.total),
        };
      }),
    };
  }

  async getExpiredCustomer() {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoin('payment.contract', 'contract')
      .where(
        'payment.type = "export" AND payment.status = "pending" AND payment.date_expired < CURRENT_DATE',
      )
      .select('contract.name_contract', 'name_contract')
      .addSelect('contract.contract_id', 'contract_id')
      .addSelect('SUM(payment.price)', 'total')
      .groupBy('contract_id')
      .orderBy('total', 'DESC')
      .getRawMany();

    return {
      statusCode: HttpStatus.OK,
      message: 'Payment retrieved successfully',
      data: result.map((dt) => {
        return { ...dt, total: Number(dt.total) };
      }),
    };
  }

  async getPaymentReadyCustomer() {
    const today = new Date();
    const weekDate = new Date();
    weekDate.setDate(today.getDate() + 30);
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoin('payment.contract', 'contract')
      .where(
        'payment.type = "export" AND payment.status = "pending" AND payment.date_expired BETWEEN :now AND :later',
        { now: today.toISOString(), later: weekDate.toISOString() },
      )
      .select('contract.name_contract', 'name_contract')
      .addSelect('contract.contract_id', 'contract_id')
      .addSelect('payment.date_expired', 'date_expired')
      .addSelect('SUM(payment.price)', 'price')
      .groupBy('contract_id')
      .addGroupBy('date_expired')
      .orderBy('date_expired', 'ASC')
      .getRawMany();

    return {
      statusCode: HttpStatus.OK,
      message: 'Payment ready',
      data: result.map((dt) => {
        return {
          date_expired: dt.date_expired,
          contract: {
            name_contract: dt.name_contract,
            contract_id: dt.contract_id,
          },
          price: Number(dt.price),
        };
      }),
    };
  }

  async getPaymentReadySupplier() {
    const today = new Date();
    const weekDate = new Date();
    weekDate.setDate(today.getDate() + 30);
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .where(
        'payment.type = "import" AND payment.status = "pending" AND payment.date_expired BETWEEN :now AND :later',
        { now: today.toISOString(), later: weekDate.toISOString() },
      )
      .select('payment.supplier', 'supplier')
      .addSelect('payment.date_expired', 'date_expired')
      .addSelect('SUM(payment.price)', 'price')
      .groupBy('supplier')
      .addGroupBy('date_expired')
      .orderBy('date_expired', 'ASC')
      .getRawMany();

    const idsSupplier = result.map((dt) => dt.supplier);

    const supplier = await firstValueFrom(
      this.productsClient.send({ cmd: 'find-all_supplier_ids' }, idsSupplier),
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Payment ready',
      data: result.map((dt, index) => {
        return { ...dt, price: Number(dt.price), supplier: supplier[index] };
      }),
    };
  }

  async getInfoPaymentDashboard() {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoin('payment.contract', 'contract')
      .where('payment.type = :type AND payment.status IN (:...statuses)', {
        type: 'export',
        statuses: ['pending', 'success'],
      })
      .andWhere('payment.date_expired >= CURRENT_DATE')
      .select('payment.status', 'status')
      .addSelect('contract.name_contract', 'name_contract')
      .addSelect('contract.contract_id', 'contract_id')
      .addSelect('SUM(payment.price)', 'total')
      .groupBy('payment.status')
      .addGroupBy('contract.contract_id')
      .getRawMany();
    return {
      statusCode: HttpStatus.OK,
      message: 'Payment retrieved successfully',
      data: result.map((dt) => {
        return { ...dt, total: Number(dt.total) };
      }),
    };
  }

  async getRevenueTotalContract() {
    // const year = new Date().getFullYear()
    const data = await this.contractRepository
      .createQueryBuilder('contract')
      .where('YEAR(contract.date_start) = :year', {
        year: new Date().getFullYear(),
      })
      .select('SUM(contract.price)', 'total')
      .getRawOne();
    return {
      statusCode: HttpStatus.OK,
      message: 'Total revenue successfully',
      data: Number(data.total ?? 0),
    };
  }

  // Delete a TypeContract by ID
  async deleteTypeContract(type_id: string) {
    try {
      const result = await this.typeContractRepository.delete(type_id);
      if (result.affected === 0) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `TypeContract with ID ${type_id} not found`,
        });
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'TypeContract deleted successfully',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete TypeContract',
      };
    }
  }

  async createOneDocumentContract(
    createDocumentContractDto: CreateDocumentContractDto,
  ) {
    const contract = await this.contractRepository.findOne({
      where: { contract_id: createDocumentContractDto.contract },
    });
    const newDocument = this.documentContractRepository.create({
      ...createDocumentContractDto,
      contract,
      document_id: uuidv4(),
    });
    const result = await this.documentContractRepository.save(newDocument);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Document created successfully',
      data: result,
    };
  }

  async deleteDocumentContract(document_id: string) {
    function extractPublicId(url: string): string {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1]; // Lấy phần cuối cùng của URL
      const publicId = fileName.split('.')[0]; // Loại bỏ phần mở rộng (.jpg, .png, ...)
      return publicId;
    }
    const dataDelete = await this.documentContractRepository.findOne({
      where: { document_id },
    });
    await this.documentContractRepository.delete({ document_id });
    const publicId = extractPublicId(dataDelete.url);
    return {
      statusCode: HttpStatus.OK,
      message: 'Picture Work deleted successfully',
      data: publicId,
    };
  }

  async getAllDocumentContract(contract_id: string) {
    const documentContract = await this.documentContractRepository.find({
      where: { contract: In([contract_id]) },
      order: { created_at: 'DESC' },
    });
    //console.log(documentContract);
    if (!documentContract) {
      throw new NotFoundException(`DocumentContract not found`);
    }
    return { statusCode: HttpStatus.OK, data: documentContract };
  }

  async createDocumentContract(
    createDocumentContract: CreateDocumentContractDto[],
  ) {
    const contract = await this.contractRepository.findOne({
      where: { contract_id: createDocumentContract[0].contract },
    });
    const newDocumentContract = this.documentContractRepository.create(
      createDocumentContract.map((dt) => {
        return { ...dt, contract, picture_id: uuidv4() };
      }),
    );
    const savedDocumentContract =
      await this.documentContractRepository.save(newDocumentContract);
    return { statusCode: HttpStatus.CREATED, data: savedDocumentContract };
  }

  async getDashboardContractByProject(project_id:string){
    try{
      const dataContract = await this.contractRepository.find({where:{project:In([project_id])}})
      const completedContract = dataContract.filter(dt => dt.status === "completed")
      const hideContract = dataContract.filter(dt => dt.status === "hide")
      const expiredSuccessContract = completedContract.filter((dt)=>{
        const dateExpired = dt.date_expired.getTime()
        const dateCompleted = dt.date_completed.getTime()
        return dateCompleted <= dateExpired
      })
      const expiredContract = dataContract.filter((dt)=>{
        const dateExpired = dt.date_expired.getTime()
        const dateNow = new Date().getTime()
        return dt.status === "active" && dateExpired < dateNow
      })
      const deleteContract = dataContract.filter(dt => dt.status === "delete")
      const activeContract = dataContract.filter(dt => dt.status === "active")
      const dataContractOK = dataContract.sort((a,b)=>{
        return b.created_at.getTime() - a.created_at.getTime()
      })
      
      return {
        statusCode:HttpStatus.OK,
        data:{
          expired_success:expiredSuccessContract.length,
          total:dataContract.length,
          overdue:expiredContract.length,
          delete:deleteContract.length,
          active:activeContract.length,
          completed:completedContract.length,
          hide:hideContract.length,
          statuses:{
            pending: dataContract.filter((dt) => dt.status === "pending").length,
            completed:dataContract.filter((dt) => dt.status === "completed").length
          },
          list_contract:dataContractOK.reduce((preValue:{time:string,list:Contract[]}[], currValue:Contract) => {
            const timeCheck =  currValue.created_at.toLocaleDateString('vi-vn')
            const dataCheck = preValue.find(dt => dt.time === timeCheck)
            if(dataCheck){
              return preValue.map((dt) => {
                if(dt.time === timeCheck){
                  return {...dt,list:[...dt.time,currValue]}
                }
                return dt
              })
            }
            return preValue.push({time:timeCheck,list:[currValue]}) 
          }, [])
        }
       
      }
    }catch(err){
      console.log(err,"loi")
    }
    
  }

  async getContractFilterByProject(filter?:{id:string}){
    // .toLocaleDateString("vi-VN")
    const dataContract = await this.contractRepository.find({where:{project:In([filter.id])},order:{created_at:'DESC'}})
    const dataCustomer = dataContract.reduce((preValue,currValue)=>{
      const time = currValue.created_at.toLocaleDateString("vi-VN")
      if(!preValue[time]){
        preValue[time] = []
      }
      preValue[time].push(currValue)
      return preValue
    },{})
    return {
      statusCode:HttpStatus.OK,
      data:dataCustomer
    }
  }

  async getProjectsByContracts(ids:string[]){
    try{
      console.log(ids)
      const listProject = (await this.contractRepository.find({where:{contract_id:In(ids ?? [''])}})).map(dt => dt.project)
      return listProject
    }catch{
      return []
    }
    
  }
 
}
