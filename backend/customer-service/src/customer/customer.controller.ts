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

@Controller()
@UseFilters(ConflictExceptionFilter)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @MessagePattern({cmd:'get-group_customer'})
  getGroupCustomer(){
    return this.customerService.getGroupCustomer()
   
  }

  @MessagePattern({cmd:'get-customer_id'})
  getCustomerID(@Payload() data:{info_id:string}){
    return this.customerService.getCustomerID(data.info_id)
   
  }

  @MessagePattern({cmd:'create-group_customer'})
  createGroupCustomer(createGroupCustomer:CreateGroupCustomerDto){
    return this.customerService.createGroupCustomer(createGroupCustomer)
   
  }

  @MessagePattern({ cmd: 'update-group_customer' })
  updateGroupCustomer(updateGroupCustomer: UpdateGroupCustomerDto) {
    return this.customerService.updateGroupCustomer(updateGroupCustomer);
  }

  @MessagePattern({ cmd: 'create-role_type_customer' })
  createRoleTypeCustomer(createRoleTypeCustomer: CreateRoleTypeCustomerDto) {
    return this.customerService.createRoleTypeCustomer(createRoleTypeCustomer);
  }

  @MessagePattern({ cmd: 'update-role_type_customer' })
  updateRoleTypeCustomer(updateRoleTypeCustomer: UpdateRoleTypeCustomerDto) {
    return this.customerService.updateRoleTypeCustomer(updateRoleTypeCustomer);
  }

  @MessagePattern({ cmd: 'create-account_customer' })
  createAccountCustomer(createAccountCustomer: CreateAccountCustomersDto) {
    return this.customerService.createAccountCustomer(createAccountCustomer);
  }

  @MessagePattern({ cmd: 'update-account_customer' })
  updateAccountCustomer(updateAccountCustomer: UpdateAccountCustomersDto) {
    return this.customerService.updateAccountCustomer(updateAccountCustomer);
  }

  @MessagePattern({ cmd: 'create-customer_info' })
  createCustomerInfo(createCustomerInfo: CreateCustomerInfoDto) {
    return this.customerService.createCustomerInfo(createCustomerInfo);
  }

  @MessagePattern({ cmd: 'update-customer_info' })
  updateCustomerInfo(updateCustomerInfo: UpdateCustomerInfoDto) {
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

  @MessagePattern({ cmd: 'update-info_contact' })
  updateInfoContact(updateInfoContact: UpdateInfoContactDto) {
    return this.customerService.updateInfoContact(updateInfoContact);
  }

  @MessagePattern({ cmd: 'create-role_customer' })
  createRoleCustomer(createRoleCustomer: CreateRoleCustomerDto) {
    return this.customerService.createRoleCustomer(createRoleCustomer);
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
  getAllCustomer(data:GetAllCustomerDto) {
    return this.customerService.getAllCustomer(data.page,data.limit);
  }
  
}
