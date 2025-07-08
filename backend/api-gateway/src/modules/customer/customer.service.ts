import {  HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateGroupCustomerDto } from './dto/update_group.dto';
import { CreateRoleTypeCustomerDto } from './dto/create_role_type_customer.dto';
import { UpdateRoleTypeCustomerDto } from './dto/update_role_type_customer.dto';
import { CreateAccountCustomersDto } from './dto/create_account_customer.dto';
import { CreateCustomerInfoDto } from './dto/create_customer_info.dto';
import { CreateInfoContactDto } from './dto/create_info_contact.dto';
import { CreateRoleCustomerDto } from './dto/create_role_customer.dto';
import { UpdateAccountCustomersDto } from './dto/update_account_customer.dto';
import { UpdateCustomerInfoDto } from './dto/update_customer_info.dto';
import { UpdateInfoContactDto } from './dto/update_info_contact.dto';
import { UpdateRoleCustomerDto } from './dto/update_role_customer.dto';
import { CreateGroupCustomerDto } from './dto/create_group.dto';
import { GetAllCustomerDto } from './dto/get_all_customer.dto';
import { firstValueFrom } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetFilterAccountCustomersDto } from './dto/get-filter-account.dto';
import { Request } from 'express';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @Inject('CUSTOMER') private readonly customerClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getAboutCustomer() {
    return this.customerClient.send({ cmd: 'get-about_customer' }, {});
  }

  async getAllCustomer(data: GetAllCustomerDto) {
    return this.customerClient.send({ cmd: 'get-all_customer' }, data);
  }

  async getAllCustomerByToken(customer_id: string) {
    return this.customerClient.send(
      { cmd: 'get-all_customer_by_token' },
      customer_id,
    );
  }

  async getGroupCustomer() {
    return await firstValueFrom(
      this.customerClient.send({ cmd: 'get-group_customer' }, {}),
    );
  }

  async getCustomerID(info_id: string) {
    return await firstValueFrom(
      this.customerClient.send({ cmd: 'get-customer_id' }, { info_id }),
    );
  }

  async getCustomerFilter(
    group?: string,
    time_first?: number,
    time_end?: number,
  ) {
    return await firstValueFrom(
      this.customerClient.send(
        { cmd: 'get-customer_filter' },
        { group, time_first, time_end },
      ),
    );
  }

  async getCustomerDashboard() {
    return await firstValueFrom(
      this.customerClient.send({ cmd: 'get-customer_dashboard' }, {}),
    );
  }

  async createGroupCustomer(creategroupCustomerDto: CreateGroupCustomerDto) {
    return this.customerClient.send(
      { cmd: 'create-group_customer' },
      creategroupCustomerDto,
    );
  }

  async sendDeleteGroupCustomer(datas: string[]) {
    return await firstValueFrom(
      this.customerClient.send({cmd:'delete-group_customer'}, datas),
    );
  }

  async updateGroupCustomer(updateGroupCustomerDto: UpdateGroupCustomerDto) {
    return this.customerClient.send(
      { cmd: 'update-group_customer' },
      updateGroupCustomerDto,
    );
  }

  async createRoleTypeCustomer(
    createRoleTypeCustomerDto: CreateRoleTypeCustomerDto,
  ) {
    return this.customerClient.send(
      { cmd: 'create-role_type_customer' },
      createRoleTypeCustomerDto,
    );
  }

  async sendDeleteRoleTypeCustomer(datas: string[]) {
    return await firstValueFrom(
      this.customerClient.send({cmd:'delete-role_type_customer'}, datas),
    );
  }

  async updateRoleTypeCustomer(
    updateRoleTypeCustomerDto: UpdateRoleTypeCustomerDto,
  ) {
    return this.customerClient.send(
      { cmd: 'update-role_type_customer' },
      updateRoleTypeCustomerDto,
    );
  }

  async createAccountCustomer(
    createAccountCustomerDto: CreateAccountCustomersDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
    return this.customerClient.send(
      { cmd: 'create-account_customer' },
      {
        ...createAccountCustomerDto,
        picture_url: data ? data.secure_url : data,
      },
    );
  }

  async getAllAccountCustomer(filter?: GetFilterAccountCustomersDto) {
    return this.customerClient.send(
      { cmd: 'get-all_account_customer' },
      filter,
    );
  }

  async getIDAccountCustomer(id: string) {
    return this.customerClient.send({ cmd: 'get-id_account_customer' }, id);
  }

  async sendDeleteAccountCustomer(datas: string[]) {
    return await firstValueFrom(
      this.customerClient.send({cmd:'delete-account_customer'}, datas),
    );
  }

  async updateAccountCustomer(
    updateAccountCustomerDto: UpdateAccountCustomersDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
    return this.customerClient.send(
      { cmd: 'update-account_customer' },
      {
        ...updateAccountCustomerDto,
        picture_url: data ? data.secure_url : undefined,
      },
    );
  }

  async createCustomerInfo(
    createCustomerInfoDto: CreateCustomerInfoDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
    return this.customerClient.send(
      { cmd: 'create-customer_info' },
      { ...createCustomerInfoDto, picture_url: data?.secure_url },
    );
  }

  async sendDeleteCustomerInfo(datas: string[]) {
    return await firstValueFrom(
      this.customerClient.send({ cmd: 'delete-customer_info' }, datas),
    );
  }

  async updateCustomerInfo(
    updateCustomerInfoDto: UpdateCustomerInfoDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : undefined;
    return this.customerClient.send(
      { cmd: 'update-customer_info' },
      { ...updateCustomerInfoDto, picture_url: data?.secure_url },
    );
  }

  async updateStatusCustomer(updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return this.customerClient.send(
      { cmd: 'update-status_customer' },
      updateCustomerInfoDto,
    );
  }

  async createInfoContact(createInfoContactDto: CreateInfoContactDto) {
    return this.customerClient.send(
      { cmd: 'create-info_contact' },
      createInfoContactDto,
    );
  }

  async sendDeleteInfoContact(datas: string[]) {
    return await firstValueFrom(
      this.customerClient.send({cmd:'delete-info_contact'}, datas),
    );
  }

  async updateInfoContact(updateInfoContactDto: UpdateInfoContactDto) {
    return this.customerClient.send(
      { cmd: 'update-info_contact' },
      updateInfoContactDto,
    );
  }

  async createRoleCustomer(createRoleCustomerDto: CreateRoleCustomerDto) {
    return this.customerClient.send(
      { cmd: 'create-role_customer' },
      createRoleCustomerDto,
    );
  }

  async sendDeleteRoleCustomer(datas: string[]) {
    return await firstValueFrom(
      this.customerClient.send({cmd:'delete-role_customer'}, datas),
    );
  }

  async updateRoleCustomer(updateRoleCustomerDto: UpdateRoleCustomerDto) {
    return this.customerClient.send(
      { cmd: 'update-role_customer' },
      updateRoleCustomerDto,
    );
  }

  async getCustomerProfile(req: Request) {
    const customer = req['customer'];
    if (customer) {
      return await firstValueFrom(
        this.customerClient.send(
          { cmd: 'get-account_customer_profile' },
          customer.sub,
        ),
      );
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Lấy thông tin thất bại',
    };
  }

  async updatePasswordCustomer(
    req: Request,
    updateCustomerDto: {
      old_password: string;
      new_password: string;
      again_password: string;
    },
  ) {
    const customer = req['customer'];
    if (customer) {
      return this.customerClient.send(
        { cmd: 'update-password_customer' },
        {
          customer_id: customer.sub,
          updateCustomerDto,
        },
      );
    }
  }

  
}
