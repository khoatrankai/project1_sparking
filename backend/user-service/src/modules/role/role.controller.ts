import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { RoleService } from './role.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleTypeUserDto } from 'src/dto/create_role.dto';
import { UpdateRoleTypeUserDto } from 'src/dto/update_role.dto';
import { CreateRoleUserDto } from 'src/dto/create_role_user.dto';
import { UpdateRoleUserDto } from 'src/dto/update_role_user.dto';
import { CreateCategoryRoleUserDto } from 'src/dto/create_category.dto';
import { UpdateCategoryRoleUserDto } from 'src/dto/update_category.dto';


@Controller()
@UseFilters(ConflictExceptionFilter)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getHello(): string {
    return this.roleService.getHello();
  }
 
  @MessagePattern({cmd:'create-role_type'})
  createRoleType(createRoleTypeUserDto: CreateRoleTypeUserDto) {
    return this.roleService.createTypeRole(createRoleTypeUserDto);
  }

  @MessagePattern({ cmd: 'delete-role_type' })
  async deleteTypeRole(datas: string[]) {
    return this.roleService.deleteTypeRole(datas);
  }

   @MessagePattern({cmd:'update-role_type'})
  updateRoleType(updateRoleTypeUserDto: UpdateRoleTypeUserDto) {
    return this.roleService.updateTypeRole(updateRoleTypeUserDto);
  }

   @MessagePattern({cmd:'add-role_user'})
  async addRoleUser(createRoleUserDto: CreateRoleUserDto) {
    return await this.roleService.addRoleUser(createRoleUserDto);
  }

  @MessagePattern({cmd:'check-role_user'})
  async checkRoleUser(data:{user_id:string,role_name_tag:string[]}) { 
    return await this.roleService.checkRoleUser(data.user_id,data.role_name_tag);
  }

  @MessagePattern({cmd:'update-role_user'})
  async updateRoleStatus(updateRoleUserDto: UpdateRoleUserDto) {
    return await this.roleService.updateRoleUser(updateRoleUserDto);
  }

  @MessagePattern({cmd:'create-category_role'})
  async createCategoryRole(createCategoryRole: CreateCategoryRoleUserDto) {
    return await this.roleService.createCategoryRole(createCategoryRole);
  }

  @MessagePattern({cmd:'update-category_role'})
  async updateCategoryRole(@Payload() data:{id:string, updateCategoryRole: UpdateCategoryRoleUserDto}) {
    return await this.roleService.updateCategoryRole(data.id,data.updateCategoryRole);
  }

  @MessagePattern({cmd:'delete-category_role'})
  async deleteCategoryRole(datas:string[]) {
    return await this.roleService.deleteCategoryRole(datas);
  }

  @MessagePattern({cmd:'get-full_category_role'})
  async getFullCategoryRole() {
    return await this.roleService.getFullCategoryRoles();
  }

  @MessagePattern({cmd:'reset-admin'})
  async resetAdmin() {
    return await this.roleService.resetRoleAdminTop();
  }


  @MessagePattern({cmd:'create-full_category_role'})
  async createFullCategoryRole(datas:{name_category:string,role_type:CreateRoleTypeUserDto[]}[]) {
    return await this.roleService.createFullCategoryRole(datas);
  }

  @MessagePattern({cmd:'get-full_role_user_id'})
  async getFullRoleUserByID(id:string) {
    return await this.roleService.getFullRoleUserByID(id);
  }

  @MessagePattern({cmd:'update-full_role_user_id'})
  async updateFullRoleUserByID(data:{id:string,role_type:string[]}) {
    return await this.roleService.updateFullRoleUserByID(data);
  }
  
  
}
