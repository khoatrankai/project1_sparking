import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateAccountCustomersDto } from './dto/create_account_customer.dto';
import { CreateCustomerInfoDto } from './dto/create_customer_info.dto';
import { CreateGroupCustomerDto } from './dto/create_group.dto';
import { CreateInfoContactDto } from './dto/create_info_contact.dto';
import { CreateRoleCustomerDto } from './dto/create_role_customer.dto';
import { CreateRoleTypeCustomerDto } from './dto/create_role_type_customer.dto';
import { UpdateAccountCustomersDto } from './dto/update_account_customer.dto';
import { UpdateCustomerInfoDto } from './dto/update_customer_info.dto';
import { UpdateGroupCustomerDto } from './dto/update_group.dto';
import { UpdateInfoContactDto } from './dto/update_info_contact.dto';
import { UpdateRoleCustomerDto } from './dto/update_role_customer.dto';
import { UpdateRoleTypeCustomerDto } from './dto/update_role_type_customer.dto';
import { GetAllCustomerDto } from './dto/get_all_customer.dto';


@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Get('get-group-customer')
  getGroupCustomer() {
    
    return this.customerService.getGroupCustomer();
  }
  
  @Post('create-group-customer')
  createGroupCustomer(@Body() createGroupCustomerDto: CreateGroupCustomerDto) {
    
    return this.customerService.createGroupCustomer(createGroupCustomerDto);
  }

  @Get('get-about-customer')
  getAboutCustomer() {
    return this.customerService.getAboutCustomer();
  }

  @Get('get-all-customer')
  getAllCustomer(@Query() data:GetAllCustomerDto) {
    return this.customerService.getAllCustomer(data);
  }

  @Get('get-customer-id')
  getCustomerID(@Query('info_id') info_id:string) {
    return this.customerService.getCustomerID(info_id);
  }

  @Put('update-group-customer')
  updateGroupCustomer(@Body() updateGroupCustomerDto: UpdateGroupCustomerDto) {
    return this.customerService.updateGroupCustomer(updateGroupCustomerDto);
  }

  @Post('create-role-type-customer')
  createRoleTypeCustomer(@Body() createRoleTypeCustomerDto: CreateRoleTypeCustomerDto) {
    return this.customerService.createRoleTypeCustomer(createRoleTypeCustomerDto);
  }

  @Put('update-role-type-customer')
  updateRoleTypeCustomer(@Body() updateRoleTypeCustomerDto: UpdateRoleTypeCustomerDto) {
    return this.customerService.updateRoleTypeCustomer(updateRoleTypeCustomerDto);
  }

  @Post('create-account-customer')
  createAccountCustomer(@Body() createAccountCustomerDto: CreateAccountCustomersDto) {
    return this.customerService.createAccountCustomer(createAccountCustomerDto);
  }

  @Put('update-account-customer')
  updateAccountCustomer(@Body() updateAccountCustomerDto: UpdateAccountCustomersDto) {
    return this.customerService.updateAccountCustomer(updateAccountCustomerDto);
  }

  @Post('create-customer-info')
  createCustomerInfo(@Body() createCustomerInfoDto: CreateCustomerInfoDto) {
    return this.customerService.createCustomerInfo(createCustomerInfoDto);
  }

  @Put('update-customer-info')
  updateCustomerInfo(@Body() updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return this.customerService.updateCustomerInfo(updateCustomerInfoDto);
  }

  @Put('update-status-customer')
  updateStatusCustomer(@Body() updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return this.customerService.updateStatusCustomer(updateCustomerInfoDto);
  }

  @Post('create-info-contact')
  createInfoContact(@Body() createInfoContactDto: CreateInfoContactDto) {
    return this.customerService.createInfoContact(createInfoContactDto);
  }

  @Put('update-info-contact')
  updateInfoContact(@Body() updateInfoContactDto: UpdateInfoContactDto) {
    return this.customerService.updateInfoContact(updateInfoContactDto);
  }

  @Post('create-role-customer')
  createRoleCustomer(@Body() createRoleCustomerDto: CreateRoleCustomerDto) {
    return this.customerService.createRoleCustomer(createRoleCustomerDto);
  }

  @Put('update-role-customer')
  updateRoleCustomer(@Body() updateRoleCustomerDto: UpdateRoleCustomerDto) {
    return this.customerService.updateRoleCustomer(updateRoleCustomerDto);
  }  
}
