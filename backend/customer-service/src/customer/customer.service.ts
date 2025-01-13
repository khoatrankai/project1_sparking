import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GroupCustomer } from 'src/database/entities/group_customer.entity';
import { CreateGroupCustomerDto } from 'src/dto/create_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UpdateGroupCustomerDto } from 'src/dto/update_group.dto';
import { CreateRoleTypeCustomerDto } from 'src/dto/create_role_type_customer.dto';
import { RoleTypeCustomer } from 'src/database/entities/role_type_customer.entity';
import { UpdateRoleTypeCustomerDto } from 'src/dto/update_role_type_customer.dto';
import { AccountCustomers } from 'src/database/entities/account_customers.entity';
import { CreateAccountCustomersDto } from 'src/dto/create_account_customer.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateAccountCustomersDto } from 'src/dto/update_account_customer.dto';
import { CreateCustomerInfoDto } from 'src/dto/create_customer_info.dto';
import { CustomerInfo } from 'src/database/entities/customer_info.entity';
import { UpdateCustomerInfoDto } from 'src/dto/update_customer_info.dto';
import { CreateInfoContactDto } from 'src/dto/create_info_contact.dto';
import { InfoContact } from 'src/database/entities/info_contact.entity';
import { UpdateInfoContactDto } from 'src/dto/update_info_contact.dto';
import { CreateRoleCustomerDto } from 'src/dto/create_role_customer.dto';
import { RoleCustomer } from 'src/database/entities/role_customer.entity';
import { UpdateRoleCustomerDto } from 'src/dto/update_role_customer.dto';
import { formatInTimeZone } from 'date-fns-tz';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetFilterAccountCustomersDto } from 'src/dto/get-filter-account.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(RoleCustomer)
    private readonly roleCustomerRepository: Repository<RoleCustomer>,
    @InjectRepository(InfoContact)
    private readonly infoContactRepository: Repository<InfoContact>,
    @InjectRepository(GroupCustomer)
    private readonly groupCustomerRepository: Repository<GroupCustomer>,
    @InjectRepository(CustomerInfo)
    private readonly customerInfoRepository: Repository<CustomerInfo>,
    @InjectRepository(RoleTypeCustomer)
    private readonly roleTypeCustomerRepository: Repository<RoleTypeCustomer>,
    @InjectRepository(AccountCustomers)
    private readonly accountCustomerRepository: Repository<AccountCustomers>,
    private configService: ConfigService,
    @Inject('SYSTEM') private readonly systemClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getGroupCustomer() {
    try {
      const data = await this.groupCustomerRepository.find();

      return {
        statusCode: HttpStatus.OK,
        data: data,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getCustomerIDs(customer_ids: string[]) {
    const data = await this.customerInfoRepository.find({
      where: { info_id: In(customer_ids) },
    });
    const sortedData = customer_ids.map((id) =>
      data.find((user) => user.info_id === id),
    );
    return sortedData;
  }

  async getCustomerFilter(group?: string, time_first?: Date, time_end?: Date) {
    const whereCondition: any = {};
    if (group) {
      const group_customer = await this.groupCustomerRepository.find({
        where: { group_id: group },
      });
      whereCondition.group_customer = group_customer;
    }
    // Lọc theo khoảng thời gian (date_start và date_expired)
    if (time_first || time_end) {
      if (time_first && time_end) {
        whereCondition.created_at = Between(time_first, time_end);
      } else {
        if (time_first) {
          whereCondition.created_at = MoreThanOrEqual(time_first);
        }
        if (time_end) {
          whereCondition.created_at = LessThanOrEqual(time_end);
        }
      }
    }

    const data = await this.customerInfoRepository.find({
      where: whereCondition,
      relations: ['group_customer'],
    });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getCustomerDashboard() {
    const data = await this.customerInfoRepository.find();
    const dataProvince = data.reduce((preValue, currValue) => {
      if (!preValue[currValue.province]) {
        preValue[currValue.province] = 0;
      }
      preValue[currValue.province] = preValue[currValue.province] + 1;
      return preValue;
    }, {});
    const dtProvince = Object.keys(dataProvince)
      .map((dt) => {
        return { id: dt, count: dataProvince[dt] };
      })
      .sort((a, b) => b.count - a.count);
    const dataGroup = await this.groupCustomerRepository.find({
      relations: ['customers'],
    });
    // return dataGroup
    const dtGroup = dataGroup.map((dt) => {
      return { ...dt, customers: dt.customers.length };
    });

    return {
      statusCode: HttpStatus.OK,
      data: {
        dashboard_province: dtProvince,
        dashboard_group: dtGroup,
      },
    };
  }

  async createGroupCustomer(createGroupCustomer: CreateGroupCustomerDto) {
    try {
      const id = uuidv4();
      const dataMew = this.groupCustomerRepository.create({
        ...createGroupCustomer,
        group_id: id,
      });
      await this.groupCustomerRepository.save(dataMew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteGroupCustomer(datas: string[]) {
    try {
      const rm = await this.groupCustomerRepository.delete({
        group_id: In(datas),
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

  async updateGroupCustomer(updateGroupCustomer: UpdateGroupCustomerDto) {
    try {
      await this.groupCustomerRepository.update(
        updateGroupCustomer.group_id,
        updateGroupCustomer,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createRoleTypeCustomer(
    createRoleTypeCustomer: CreateRoleTypeCustomerDto,
  ) {
    try {
      const id = uuidv4();
      const dataMew = this.roleTypeCustomerRepository.create({
        ...createRoleTypeCustomer,
        role_type_id: id,
      });
      await this.roleTypeCustomerRepository.save(dataMew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteRoleTypeCustomer(datas: string[]) {
    try {
      const rm = await this.roleTypeCustomerRepository.delete({
        role_type_id: In(datas),
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

  async updateRoleTypeCustomer(
    updateRoleTypeCustomer: UpdateRoleTypeCustomerDto,
  ) {
    try {
      await this.roleTypeCustomerRepository.update(
        updateRoleTypeCustomer.role_type_id,
        updateRoleTypeCustomer,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(this.configService.get<string>('SALT')),
    );
    return hashedPassword;
  }
  async createAccountCustomer(
    createAccountCustomer: CreateAccountCustomersDto,
  ) {
    try {
      const id = uuidv4();
      const pass = await this.hashPassword(createAccountCustomer.password);
      const dataMew = this.accountCustomerRepository.create({
        ...createAccountCustomer,
        customer_id: id,
        password: pass,
      });
      const account = await this.accountCustomerRepository.save(dataMew);
      if (createAccountCustomer.customer_info) {
        const idInfoContact = uuidv4();
        const infoCompany = await this.customerInfoRepository.findOne({
          where: { info_id: createAccountCustomer.customer_info },
        });
        const infoContactNew = this.infoContactRepository.create({
          info_contact_id: idInfoContact,
          customer: account,
          info_company: infoCompany,
        });
        await this.infoContactRepository.save(infoContactNew);
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Đã tạo thành công',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,

        message: 'Đã tạo thất bại',
      };
    }
  }

  async getAllAccountCustomer(filter?: GetFilterAccountCustomersDto) {
    try {
      if (filter.customer_info) {
        const data = await this.customerInfoRepository
          .createQueryBuilder('customerInfo')
          .leftJoin('customerInfo.infoContacts', 'infoContacts')
          .leftJoin('infoContacts.customer', 'customer')
          .where('customerInfo.info_id = :info_id', {
            info_id: filter.customer_info,
          })
          .select([
            'customer.customer_id AS customer_id',
            'customer.full_name AS full_name',
            'customer.email AS email',
            'customer.position AS position',
            'customer.picture_url AS picture_url',
            'customer.gender AS gender',
            'customer.phone_number AS phone_number',
            'customer.date_of_birth AS date_of_birth',
            'customer.status AS status',
            'customer.created_at AS created_at',
            'customer.updated_at AS updated_at',
          ])
          .getRawMany();
        return {
          statusCode: HttpStatus.OK,
          data: data.filter((dt) => dt.customer_id !== null) ?? [],
        };
      } else {
        const data = await this.accountCustomerRepository.find({
          select: {
            created_at: true,
            customer_id: true,
            date_of_birth: true,
            email: true,
            full_name: true,
            gender: true,
            phone_number: true,
            picture_url: true,
            position: true,
            status: true,
            updated_at: true,
          },
        });
        return {
          statusCode: HttpStatus.OK,
          data,
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async getIDAccountCustomer(id: string) {
    try {
      const data = await this.accountCustomerRepository.findOne({
        where: { customer_id: id },
        select: {
          created_at: true,
          customer_id: true,
          date_of_birth: true,
          email: true,
          full_name: true,
          gender: true,
          phone_number: true,
          picture_url: true,
          position: true,
          status: true,
          updated_at: true,
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteAccountCustomer(datas: string[]) {
    try {
      const rm = await this.accountCustomerRepository.delete({
        customer_id: In(datas),
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

  async updateAccountCustomer(
    updateAccountCustomer: UpdateAccountCustomersDto,
  ) {
    try {
      if (updateAccountCustomer.password) {
        const pass = await this.hashPassword(updateAccountCustomer.password);
        await this.accountCustomerRepository.update(
          updateAccountCustomer.customer_id,
          {
            ...updateAccountCustomer,
            password: updateAccountCustomer.password ? pass : undefined,
          },
        );
      } else {
        await this.accountCustomerRepository.update(
          updateAccountCustomer.customer_id,
          updateAccountCustomer,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createCustomerInfo(createCustomerInfo: CreateCustomerInfoDto) {
    try {
      const id = uuidv4();
      if (createCustomerInfo.group_customer) {
        const group = await this.groupCustomerRepository.findOne({
          where: { group_id: createCustomerInfo.group_customer },
        });
        const dataMew = this.customerInfoRepository.create({
          ...createCustomerInfo,
          group_customer: group,
          info_id: id,
        });
        await this.customerInfoRepository.save(dataMew);
      } else {
        const dataMew = this.customerInfoRepository.create({
          ...createCustomerInfo,
          group_customer: null,
          info_id: id,
        });
        await this.customerInfoRepository.save(dataMew);
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo thông tin khách hàng thành công',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tạo thông tin khách hàng thất bại',
      };
    }
  }

  async deleteCustomerInfo(datas: string[]) {
    try {
      const rm = await this.customerInfoRepository.delete({
        info_id: In(datas),
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

  async updateCustomerInfo(updateCustomerInfo: UpdateCustomerInfoDto) {
    try {
      const group = await this.groupCustomerRepository.findOne({
        where: { group_id: updateCustomerInfo.group_customer },
      });
      await this.customerInfoRepository.update(updateCustomerInfo.info_id, {
        ...updateCustomerInfo,
        group_customer: group,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thông tin thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createInfoContact(createInfoContact: CreateInfoContactDto) {
    try {
      const id = uuidv4();
      const customer = await this.accountCustomerRepository.findOne({
        where: { customer_id: createInfoContact.customer },
      });
      const info = await this.customerInfoRepository.findOne({
        where: { info_id: createInfoContact.info_company },
      });
      if (customer && info) {
        const dataNew = this.infoContactRepository.create({
          ...createInfoContact,
          info_contact_id: id,
          info_company: info,
          customer: customer,
        });
        await this.infoContactRepository.save(dataNew);
      }

      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteInfoContact(datas: string[]) {
    try {
      const rm = await this.infoContactRepository.delete({
        info_contact_id: In(datas),
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

  async updateInfoContact(updateInfoContact: UpdateInfoContactDto) {
    try {
      await this.infoContactRepository.update(
        updateInfoContact.info_contact_id,
        updateInfoContact,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createRoleCustomer(createRoleCustomer: CreateRoleCustomerDto) {
    try {
      const id = uuidv4();
      const infoCompany = await this.customerInfoRepository.findOne({
        where: { info_id: createRoleCustomer.info_company },
      });
      const customer = await this.accountCustomerRepository.findOne({
        where: { customer_id: createRoleCustomer.customer },
      });
      const roleType = await this.roleTypeCustomerRepository.findOne({
        where: { role_type_id: createRoleCustomer.role_type },
      });
      if (customer && infoCompany && roleType) {
        const data = {
          role_id: id,
          ...createRoleCustomer,
          customer: customer,
          info_company: infoCompany,
          role_type: roleType,
        };
        const dataNew = this.roleCustomerRepository.create(data);
        await this.roleCustomerRepository.save(dataNew);
      }

      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteRoleCustomer(datas: string[]) {
    try {
      const rm = await this.roleTypeCustomerRepository.delete({
        role_type_id: In(datas),
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

  async updateRoleCustomer(updateRoleCustomer: UpdateRoleCustomerDto) {
    try {
      await this.infoContactRepository.update(
        updateRoleCustomer.role_id,
        updateRoleCustomer,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  checkToday(time: Date) {
    const date = time;
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  async getAboutCustomer() {
    try {
      const countCustomer = await this.customerInfoRepository.count({});
      const countCustomerActive = await this.customerInfoRepository.count({
        where: { status_active: 'active' },
      });
      const countCustomerInActive = await this.customerInfoRepository.count({
        where: { status_active: 'inactive' },
      });
      const countContactActive = await this.accountCustomerRepository.count({
        where: { status: 'active' },
      });
      const countContactInActive = await this.accountCustomerRepository.count({
        where: { status: 'hide' },
      });
      const customers = (
        await this.accountCustomerRepository.find({
          where: { status: 'active' },
        })
      ).filter((dt) => {
        return this.checkToday(dt.date_active);
      }).length;

      return {
        statusCode: HttpStatus.OK,
        data: {
          totalCustomer: countCustomer,
          totalActive: countCustomerActive,
          totalInActive: countCustomerInActive,
          contactActive: countContactActive,
          contactInactive: countContactInActive,
          contactActiveToday: customers,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updateStatusCustomer(dataNew: UpdateCustomerInfoDto) {
    try {
      const data = await this.customerInfoRepository.update(dataNew.info_id, {
        status_active: dataNew.status_active,
      });
      if (data) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Cập nhật thành công',
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Cập nhật thất bại',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật thất bại',
      };
    }
  }

  async getAllCustomer(page: string, limit: string) {
    try {
      const dataAll = (
        await this.customerInfoRepository
          .createQueryBuilder('customer_info')
          .leftJoinAndSelect('customer_info.group_customer', 'group_customer')
          .leftJoinAndSelect('customer_info.infoContacts', 'infoContacts')
          .leftJoinAndSelect('infoContacts.customer', 'customer')
          // await this.infoContactRepository.createQueryBuilder('info_contact').leftJoinAndSelect('info_contact.customer', 'customer').leftJoinAndSelect('info_contact.info_company', 'info_company')
          //  .where('status_active = :status', { status: 'active' })
          .orderBy('customer_info.created_at', 'DESC')
          .select([
            'customer_info',
            'infoContacts',
            'customer.customer_id',
            'customer.full_name',
            'customer.email',
            'group_customer',
          ])
          .offset((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .getMany()
      ).map((dt) => {
        return {
          ...dt,
          created_at: formatInTimeZone(
            dt.created_at,
            'Asia/Ho_Chi_Minh',
            'yyyy-MM-dd HH:mm:ssXXX',
          ),
        };
      });
      return {
        statusCode: HttpStatus.OK,
        data: dataAll,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getCustomerID(info_id: string) {
    try {
      const data = await this.customerInfoRepository.findOne({
        where: { info_id },
        relations: ['group_customer'],
      });
      return {
        statusCode: HttpStatus.OK,
        data: data,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getFullCustomerID(info_id: string) {
    try {
      const data = await this.customerInfoRepository.findOne({
        where: { info_id },
        relations: ['group_customer'],
      });

      const dataProvince = await firstValueFrom(
        this.systemClient.send(
          { cmd: 'get-province_id' },
          data.province_delivery,
        ),
      );
      console.log(dataProvince);
      return {
        statusCode: HttpStatus.OK,
        data: { ...data, province_delivery: dataProvince },
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
