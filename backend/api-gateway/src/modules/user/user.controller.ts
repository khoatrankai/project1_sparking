import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InfoUserInterface } from './interfaces/info-user.interface';
import { CreateRoleTypeUserDto } from './dto/create_role.dto';
import { UpdateRoleTypeUserDto } from './dto/update_role.dto';
import { CreateRoleUserDto } from './dto/create_role_user.dto';
import { UpdateRoleUserDto } from './dto/update_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update_user.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateCategoryRoleUserDto } from './dto/create_category.dto';
import { UpdateCategoryRoleUserDto } from './dto/update_category.dto';
import { CreateGroupUserDto } from './dto/GroupUser/create_group.dto';
import { UpdateGroupUserDto } from './dto/GroupUser/update_group.dto';
// import { RoleGuard } from 'src/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-one', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Get('info')
  findOneInfo(@Query('user_id') user_id: string): Promise<InfoUserInterface> {
    return this.userService.findOneInfo(user_id);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return await this.userService.updateUser(
      id,
      updateUserDto,
      picture_url?.[0],
    );
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Post('create')
  @UseInterceptors(FilesInterceptor('picture_url', 1))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() picture_url: Express.Multer.File[],
  ) {
    return await this.userService.createUser(createUserDto, picture_url?.[0]);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Delete()
  async sendDeleteUser(@Body() datas: string[]) {
    return this.userService.sendDeleteUsers(datas);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'role-create', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Post('create-role-type')
  async createRoleType(@Body() createRoleTypeUserDto: CreateRoleTypeUserDto) {
    return await this.userService.createRoleType(createRoleTypeUserDto);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'role-delete', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Delete('role-type')
  async sendDeleteRoleType(@Body() datas: string[]) {
    return this.userService.sendDeleteRoleUser(datas);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'role-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Put('update-role-type')
  async updateRoleType(@Body() updateRoleTypeUserDto: UpdateRoleTypeUserDto) {
    return await this.userService.updateRoleType(updateRoleTypeUserDto);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'role-user-add', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Post('add-role-user')
  async addRoleUser(@Body() createRoleUserDto: CreateRoleUserDto) {
    return await this.userService.addRoleUser(createRoleUserDto);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'role-user-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Put('update-role-user')
  async updateRoleUser(@Body() updateRoleUserDto: UpdateRoleUserDto) {
    return await this.userService.updateRoleUser(updateRoleUserDto);
  }

  // @SetMetadata('checkfull',['all'])
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', [
  //   'user',
  //   'customer',
  //   'user-all',
  //   'opportunity',
  //   'price_quote',
  //   'product',
  //   'project',
  //   'admin-top',
  //   'activity',
  // ])
  // @SetMetadata('type', ['admin'])
  @Get('all')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-id', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Get('/admin/id/:id')
  async getUserIDAdmin(@Param('id') id: string) {
    return await this.userService.getUserIDAdmin(id);
  }

  @Get('/profile')
  async getUserIDProfile(@Req() req: Request) {
    return await this.userService.getUserIDProfile(req);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin-top'])
  @SetMetadata('type', ['admin'])
  @Post('category-role')
  async createCategoryRole(
    @Body() createCategoryRoleDto: CreateCategoryRoleUserDto,
  ) {
    return await this.userService.createCategoryRole(createCategoryRoleDto);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin-top'])
  @SetMetadata('type', ['admin'])
  @Put('category-role/:id')
  async updateCategoryRole(
    @Param('id') id: string,
    @Body() updateCategoryRoleDto: UpdateCategoryRoleUserDto,
  ) {
    return await this.userService.updateCategoryRole(id, updateCategoryRoleDto);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin-top'])
  @SetMetadata('type', ['admin'])
  @Delete('category-role')
  async deleteCategoryRole(@Body() datas: string[]) {
    return await this.userService.deleteCategoryRole(datas);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @Get('category-role-full')
  async getFullCategoryRole() {
    return await this.userService.getFullCategoryRole();
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin-top'])
  @SetMetadata('type', ['admin'])
  @Get('get-full-role-user-id/:id')
  async getFullRoleUserByID(@Param('id') id: string) {
    return await this.userService.getFullRoleUserByID(id);
  }

  @Get('get-full-role-user-access')
  async getFullRoleUserByAccess(@Req() req: Request) {
    return await this.userService.getFullRoleUserByAccess(req);
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin-top'])
  @SetMetadata('type', ['admin'])
  @Post('full-role-user-id/:id')
  async updateFullRoleUserByID(
    @Param('id') id: string,
    @Body() role_type: string[],
  ) {
    return await this.userService.updateFullRoleUserByID({ id, role_type });
  }

  @Post('reset-admin')
  async resetAdmin() {
    return await this.userService.resetAdmin();
  }

  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['admin-top'])
  @SetMetadata('type', ['admin'])
  @Post('create-full-category-role')
  async createFullCategoryRole(
    @Body()
    datas: { name_category: string; role_type: CreateRoleTypeUserDto[] }[],
  ) {
    return await this.userService.createFullCategoryRole(datas);
  }

  @Get('get-group-user')
  getGroupUser() {
    return this.userService.getGroupUser();
  }

  @Post('create-group-user')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-create', 'user-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  createGroupUser(@Body() createGroupUserDto: CreateGroupUserDto) {
    return this.userService.createGroupUser(createGroupUserDto);
  }

  @Delete('/group-user')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteGroupUser(@Body() datas: string[]) {
    return this.userService.sendDeleteGroupUser(datas);
  }

  @Put('update-group-user/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['user', 'user-update', 'admin-top'])
  @SetMetadata('type', ['admin'])
  updateGroupUser(
    @Param('id') id: string,
    @Body() updateGroupUserDto: UpdateGroupUserDto,
  ) {
    return this.userService.updateGroupUser({
      ...updateGroupUserDto,
      group_id: id,
    });
  }
}
