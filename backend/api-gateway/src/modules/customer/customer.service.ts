import { Inject, Injectable } from '@nestjs/common';
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
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CustomerService {

  constructor(private readonly cloudinaryService:CloudinaryService,@Inject('CUSTOMER') private readonly customerClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async getAboutCustomer() {
    return this.customerClient.send({ cmd: 'get-about_customer' },{});
  }

  async getAllCustomer(data:GetAllCustomerDto) {
    return this.customerClient.send({ cmd: 'get-all_customer' },data);
  }

  async getGroupCustomer() {
    return await firstValueFrom(this.customerClient.send({ cmd: 'get-group_customer' }, {}));
  }

  async getCustomerID(info_id:string) {
    return await firstValueFrom(this.customerClient.send({ cmd: 'get-customer_id' }, {info_id}));
  }

  async getCustomerFilter(group?:string,time_first?:number,time_end?:number) {
    return await firstValueFrom(this.customerClient.send({ cmd: 'get-customer_filter' }, {group,time_first,time_end}));
  }

  async getCustomerDashboard() {
    return await firstValueFrom(this.customerClient.send({ cmd: 'get-customer_dashboard' }, {}));
  }

  async createGroupCustomer(creategroupCustomerDto: CreateGroupCustomerDto) {
    return this.customerClient.send({ cmd: 'create-group_customer' }, creategroupCustomerDto);
  }

  async updateGroupCustomer(updateGroupCustomerDto: UpdateGroupCustomerDto) {
    return this.customerClient.send({ cmd: 'update-group_customer' }, updateGroupCustomerDto);
  }

  async createRoleTypeCustomer(createRoleTypeCustomerDto: CreateRoleTypeCustomerDto) {
    return this.customerClient.send({ cmd: 'create-role_type_customer' }, createRoleTypeCustomerDto);
  }

  async updateRoleTypeCustomer(updateRoleTypeCustomerDto: UpdateRoleTypeCustomerDto) {
    return this.customerClient.send({ cmd: 'update-role_type_customer' }, updateRoleTypeCustomerDto);
  }

  async createAccountCustomer(createAccountCustomerDto: CreateAccountCustomersDto) {
    return this.customerClient.send({ cmd: 'create-account_customer' }, createAccountCustomerDto);
  }

  async updateAccountCustomer(updateAccountCustomerDto: UpdateAccountCustomersDto) {
    return this.customerClient.send({ cmd: 'update-account_customer' }, updateAccountCustomerDto);
  }

  async createCustomerInfo(createCustomerInfoDto: CreateCustomerInfoDto,picture_url:Express.Multer.File) {
    const data = await this.cloudinaryService.uploadFile(picture_url)
    return this.customerClient.send({ cmd: 'create-customer_info' }, {...createCustomerInfoDto,picture_url:data.secure_url});
  }

  async updateCustomerInfo(updateCustomerInfoDto: UpdateCustomerInfoDto,picture_url:Express.Multer.File) {
    const data = await this.cloudinaryService.uploadFile(picture_url)
    return this.customerClient.send({ cmd: 'update-customer_info' }, {...updateCustomerInfoDto,picture_url:data?.secure_url});
  }

  async updateStatusCustomer(updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return this.customerClient.send({ cmd: 'update-status_customer' }, updateCustomerInfoDto);
  }

  async createInfoContact(createInfoContactDto: CreateInfoContactDto) {
    return this.customerClient.send({ cmd: 'create-info_contact' }, createInfoContactDto);
  }

  async updateInfoContact(updateInfoContactDto: UpdateInfoContactDto) {
    return this.customerClient.send({ cmd: 'update-info_contact' }, updateInfoContactDto);
  }

  async createRoleCustomer(createRoleCustomerDto: CreateRoleCustomerDto) {
    return this.customerClient.send({ cmd: 'create-role_customer' }, createRoleCustomerDto);
  }

  async updateRoleCustomer(updateRoleCustomerDto: UpdateRoleCustomerDto) {
    return this.customerClient.send({ cmd: 'update-role_customer' }, updateRoleCustomerDto);
  }
 
 
}
