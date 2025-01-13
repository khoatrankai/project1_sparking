import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/guards/role.guard';
import { GetFilterAccountCustomersDto } from './dto/get-filter-account.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Get('get-group-customer')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', [
  //   'customer',
  //   'customer-read',
  //   'customer-update',
  //   'admin-top',
  // ])
  // @SetMetadata('type', ['admin'])
  getGroupCustomer() {
    return this.customerService.getGroupCustomer();
  }

  @Post('create-group-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'customer',
    'customer-create',
    'customer-update',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  createGroupCustomer(@Body() createGroupCustomerDto: CreateGroupCustomerDto) {
    return this.customerService.createGroupCustomer(createGroupCustomerDto);
  }

  @Delete('/group-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypeMethod(@Body() datas: string[]) {
    return this.customerService.sendDeleteGroupCustomer(datas);
  }

  @Get('get-about-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getAboutCustomer() {
    return this.customerService.getAboutCustomer();
  }

  @Get('get-all-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', [
    'customer',
    'project',
    'customer-read',
    'contract',
    'product',
    'admin-top',
  ])
  @SetMetadata('type', ['admin'])
  getAllCustomer(@Query() data: GetAllCustomerDto) {
    return this.customerService.getAllCustomer(data);
  }

  @Get('get-customer-id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getCustomerID(@Query('info_id') info_id: string) {
    return this.customerService.getCustomerID(info_id);
  }

  @Get('get-customer-dashboard')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getCustomerDashboard() {
    return this.customerService.getCustomerDashboard();
  }

  @Get('get-customer-filter')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-read', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getCustomerFilter(
    @Query('group') group: string,
    @Query('time_first') time_first: number,
    @Query('time_end') time_end: number,
  ) {
    return this.customerService.getCustomerFilter(group, time_first, time_end);
  }

  @Put('update-group-customer/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  updateGroupCustomer(
    @Param('id') id: string,
    @Body() updateGroupCustomerDto: UpdateGroupCustomerDto,
  ) {
    return this.customerService.updateGroupCustomer({
      ...updateGroupCustomerDto,
      group_id: id,
    });
  }

  @Post('create-role-type-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  createRoleTypeCustomer(
    @Body() createRoleTypeCustomerDto: CreateRoleTypeCustomerDto,
  ) {
    return this.customerService.createRoleTypeCustomer(
      createRoleTypeCustomerDto,
    );
  }

  @Delete('/role-type-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteRoleTypeCustomer(@Body() datas: string[]) {
    return this.customerService.sendDeleteRoleTypeCustomer(datas);
  }

  @Put('update-role-type-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  updateRoleTypeCustomer(
    @Body() updateRoleTypeCustomerDto: UpdateRoleTypeCustomerDto,
  ) {
    return this.customerService.updateRoleTypeCustomer(
      updateRoleTypeCustomerDto,
    );
  }

  @Post('create-account-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  createAccountCustomer(
    @Body() createAccountCustomerDto: CreateAccountCustomersDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return this.customerService.createAccountCustomer(
      createAccountCustomerDto,
      picture_url?.[0],
    );
  }

  @Delete('/account-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteAccountCustomer(@Body() datas: string[]) {
    return this.customerService.sendDeleteAccountCustomer(datas);
  }

  @Put('update-account-customer/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  updateAccountCustomer(
    @Param('id') id: string,
    @Body() updateAccountCustomerDto: UpdateAccountCustomersDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return this.customerService.updateAccountCustomer(
      { ...updateAccountCustomerDto, customer_id: id },
      picture_url?.[0],
    );
  }

  @Get('get-all-account-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getAllAccountCustomer(@Query() filter?: GetFilterAccountCustomersDto) {
    return this.customerService.getAllAccountCustomer(filter);
  }

  @Get('get-id-account-customer/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getIDAccountCustomer(@Param('id') id: string) {
    return this.customerService.getIDAccountCustomer(id);
  }

  @Post('create-customer-info')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  createCustomerInfo(
    @Body() createCustomerInfoDto: CreateCustomerInfoDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return this.customerService.createCustomerInfo(
      createCustomerInfoDto,
      picture_url?.[0],
    );
  }

  @Delete('/customer-info')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteCustomerInfo(@Body() datas: string[]) {
    // console.log(datas)
    return this.customerService.sendDeleteCustomerInfo(datas);
  }

  @Put('update-customer-info')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  updateCustomerInfo(
    @Body() updateCustomerInfoDto: UpdateCustomerInfoDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return this.customerService.updateCustomerInfo(
      updateCustomerInfoDto,
      picture_url?.[0],
    );
  }

  @Put('update-status-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  updateStatusCustomer(@Body() updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return this.customerService.updateStatusCustomer(updateCustomerInfoDto);
  }

  @Post('create-info-contact')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  createInfoContact(@Body() createInfoContactDto: CreateInfoContactDto) {
    return this.customerService.createInfoContact(createInfoContactDto);
  }

  @Delete('/info-contact')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteInfoContact(@Body() datas: string[]) {
    return this.customerService.sendDeleteInfoContact(datas);
  }

  @Put('update-info-contact')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  updateInfoContact(@Body() updateInfoContactDto: UpdateInfoContactDto) {
    return this.customerService.updateInfoContact(updateInfoContactDto);
  }

  @Post('create-role-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  createRoleCustomer(@Body() createRoleCustomerDto: CreateRoleCustomerDto) {
    return this.customerService.createRoleCustomer(createRoleCustomerDto);
  }

  @Delete('/role-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteRoleCustomer(@Body() datas: string[]) {
    return this.customerService.sendDeleteRoleCustomer(datas);
  }

  @Put('update-role-customer')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['customer', 'customer-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  updateRoleCustomer(@Body() updateRoleCustomerDto: UpdateRoleCustomerDto) {
    return this.customerService.updateRoleCustomer(updateRoleCustomerDto);
  }
}
