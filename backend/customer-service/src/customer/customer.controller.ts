import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { CustomerService } from './customer.service';
import { CreateGroupCustomerDto } from 'src/dto/create_group.dto';
import { UpdateGroupCustomerDto } from 'src/dto/update_group.dto';
import { CreateRoleTypeCustomerDto } from 'src/dto/create_role_type_customer.dto';
import { UpdateRoleTypeCustomerDto } from 'src/dto/update_role_type_customer.dto';
import { CreateAccountCustomersDto } from 'src/dto/create_account_customer.dto';
import { UpdateAccountCustomersDto } from 'src/dto/update_account_customer.dto';
import { CreateCustomerInfoDto } from 'src/dto/create_customer_info.dto';
import { UpdateCustomerInfoDto } from 'src/dto/update_customer_info.dto';
import { CreateInfoContactDto } from 'src/dto/create_info_contact.dto';
import { UpdateInfoContactDto } from 'src/dto/update_info_contact.dto';
import { CreateRoleCustomerDto } from 'src/dto/create_role_customer.dto';
import { UpdateRoleCustomerDto } from 'src/dto/update_role_customer.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllCustomerDto } from 'src/dto/get_all_customer.dto';
import { GetFilterAccountCustomersDto } from 'src/dto/get-filter-account.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @MessagePattern({ cmd: 'get-group_customer' })
  getGroupCustomer() {
    return this.customerService.getGroupCustomer();
  }

  @MessagePattern({ cmd: 'get-customer_id' })
  getCustomerID(@Payload() data: { info_id: string }) {
    return this.customerService.getCustomerID(data.info_id);
  }

  @MessagePattern({ cmd: 'get-full_info_customer_id' })
  getFullCustomerID(@Payload() info_id: string) {
    return this.customerService.getFullCustomerID(info_id);
  }

  @MessagePattern({ cmd: 'get-customer_ids' })
  getCustomerIDs(@Payload() customer_ids: string[]) {
    return this.customerService.getCustomerIDs(customer_ids);
  }

  @MessagePattern({ cmd: 'get-customer_dashboard' })
  getCustomerDashboard() {
    return this.customerService.getCustomerDashboard();
  }

  @MessagePattern({ cmd: 'get-customer_filter' })
  getCustomerFilter(
    @Payload('group') group?: string,
    @Payload('time_first') time_first?: number,
    @Payload('time_end') time_end?: number,
  ) {
    return this.customerService.getCustomerFilter(
      group,
      time_first ? new Date(time_first) : null,
      time_end ? new Date(time_end) : null,
    );
  }

  @MessagePattern({ cmd: 'create-group_customer' })
  createGroupCustomer(createGroupCustomer: CreateGroupCustomerDto) {
    return this.customerService.createGroupCustomer(createGroupCustomer);
  }

  @MessagePattern({ cmd: 'delete-group_customer' })
  async deleteGroupCustomer(@Payload() datas: string[]) {
    return this.customerService.deleteGroupCustomer(datas);
  }

  @MessagePattern({ cmd: 'update-group_customer' })
  updateGroupCustomer(updateGroupCustomer: UpdateGroupCustomerDto) {
    return this.customerService.updateGroupCustomer(updateGroupCustomer);
  }

  @MessagePattern({ cmd: 'create-role_type_customer' })
  createRoleTypeCustomer(createRoleTypeCustomer: CreateRoleTypeCustomerDto) {
    return this.customerService.createRoleTypeCustomer(createRoleTypeCustomer);
  }

  @MessagePattern({ cmd: 'delete-role_type_customer' })
  async deleteRoleTypeCustomer(@Payload() datas: string[]) {
    return this.customerService.deleteRoleTypeCustomer(datas);
  }

  @MessagePattern({ cmd: 'update-role_type_customer' })
  updateRoleTypeCustomer(updateRoleTypeCustomer: UpdateRoleTypeCustomerDto) {
    return this.customerService.updateRoleTypeCustomer(updateRoleTypeCustomer);
  }

  @MessagePattern({ cmd: 'create-account_customer' })
  createAccountCustomer(createAccountCustomer: CreateAccountCustomersDto) {
    return this.customerService.createAccountCustomer(createAccountCustomer);
  }

  @MessagePattern({ cmd: 'get-all_account_customer' })
  getAllAccountCustomer(filter?: GetFilterAccountCustomersDto) {
    return this.customerService.getAllAccountCustomer(filter);
  }

  @MessagePattern({ cmd: 'get-id_account_customer' })
  getIDAccountCustomer(id: string) {
    return this.customerService.getIDAccountCustomer(id);
  }

  @MessagePattern({ cmd: 'delete-account_customer' })
  async deleteAccountCustomer(@Payload() datas: string[]) {
    return this.customerService.deleteAccountCustomer(datas);
  }

  @MessagePattern({ cmd: 'update-account_customer' })
  updateAccountCustomer(updateAccountCustomer: UpdateAccountCustomersDto) {
    return this.customerService.updateAccountCustomer(updateAccountCustomer);
  }

  @MessagePattern({ cmd: 'create-customer_info' })
  createCustomerInfo(createCustomerInfo: CreateCustomerInfoDto) {
    return this.customerService.createCustomerInfo(createCustomerInfo);
  }

  @MessagePattern({ cmd: 'delete-customer_info' })
  async deleteCustomerInfo(@Payload() datas: string[]) {
    return this.customerService.deleteCustomerInfo(datas);
  }

  @MessagePattern({ cmd: 'update-customer_info' })
  updateCustomerInfo(updateCustomerInfo: UpdateCustomerInfoDto) {
    //console.log(updateCustomerInfo);
    return this.customerService.updateCustomerInfo(updateCustomerInfo);
  }

  @MessagePattern({ cmd: 'update-status_customer' })
  updateStatusCustomer(updateCustomerInfo: UpdateCustomerInfoDto) {
    return this.customerService.updateStatusCustomer(updateCustomerInfo);
  }

  @MessagePattern({ cmd: 'create-info_contact' })
  createInfoContact(createInfoContact: CreateInfoContactDto) {
    return this.customerService.createInfoContact(createInfoContact);
  }

  @MessagePattern({ cmd: 'delete-info_contact' })
  async deleteInfoContact(@Payload() datas: string[]) {
    return this.customerService.deleteInfoContact(datas);
  }

  @MessagePattern({ cmd: 'update-info_contact' })
  updateInfoContact(updateInfoContact: UpdateInfoContactDto) {
    return this.customerService.updateInfoContact(updateInfoContact);
  }

  @MessagePattern({ cmd: 'create-role_customer' })
  createRoleCustomer(createRoleCustomer: CreateRoleCustomerDto) {
    return this.customerService.createRoleCustomer(createRoleCustomer);
  }

  @MessagePattern({ cmd: 'delete-role_customer' })
  async deleteRoleCustomer(@Payload() datas: string[]) {
    return this.customerService.deleteRoleCustomer(datas);
  }

  @MessagePattern({ cmd: 'update-role_customer' })
  updateRoleCustomer(updateRoleCustomer: UpdateRoleCustomerDto) {
    return this.customerService.updateRoleCustomer(updateRoleCustomer);
  }

  @MessagePattern({ cmd: 'get-about_customer' })
  getAboutCustomer() {
    return this.customerService.getAboutCustomer();
  }

  @MessagePattern({ cmd: 'get-all_customer' })
  getAllCustomer(data: GetAllCustomerDto) {
    return this.customerService.getAllCustomer(data.page, data.limit);
  }

  @MessagePattern({ cmd: 'get-all_customer_by_token' })
  getAllCustomerByToken(customer_id: string) {
    return this.customerService.getAllCustomerByToken(customer_id);
  }

  @MessagePattern({ cmd: 'login-customer' })
  findCustomer(username: string) {
    return this.customerService.findCustomer(username);
  }

  @MessagePattern({ cmd: 'get-account_customer_profile' })
  getCustomerProfile(customer_id: string) {
    return this.customerService.getCustomerProfile(customer_id);
  }

  @MessagePattern({ cmd: 'create-customer_opportunity' })
  createCustomerOpportunity(data: {
    name_contact: string;
    company_name: string;
    email: string;
    position: string;
    address: string;
    website: string;
    phone_number: string;
    province: string;
    user_support: string;
  }) {
    return this.customerService.createCustomerOpportunity(data);
  }

  @MessagePattern({ cmd: 'update-password_customer' })
  updatePasswordCustomer(
    @Payload('customer_id') customer_id: string,
    @Payload('updateCustomerDto')
    updateCustomerDto: {
      old_password: string;
      new_password: string;
      again_password: string;
    },
  ) {
    return this.customerService.updatePasswordCustomer(
      customer_id,
      updateCustomerDto,
    );
  }

  @MessagePattern({ cmd: 'get-ids_customer_by_provinces' })
  getCustomerIdsByProvinces(ids: string[]) {
    return this.customerService.getCustomerIdsByProvinces(ids);
  }

  @MessagePattern({ cmd: 'check-create-customer-name' })
  checkCreateCustomerName(name: string) {
    return this.customerService.checkCreateCustomerName(name);
  }
}
