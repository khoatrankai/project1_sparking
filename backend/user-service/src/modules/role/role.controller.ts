import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { RoleService } from './role.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRoleTypeUserDto } from 'src/dto/create_role.dto';
import { UpdateRoleTypeUserDto } from 'src/dto/update_role.dto';
import { CreateRoleUserDto } from 'src/dto/create_role_user.dto';
import { UpdateRoleUserDto } from 'src/dto/update_role_user.dto';


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

   @MessagePattern({cmd:'update-role_type'})
  updateRoleType(updateRoleTypeUserDto: UpdateRoleTypeUserDto) {
    return this.roleService.updateTypeRole(updateRoleTypeUserDto);
  }

   @MessagePattern({cmd:'add-role_user'})
  async addRoleUser(createRoleUserDto: CreateRoleUserDto) {
    return await this.roleService.addRoleUser(createRoleUserDto);
  }

  @MessagePattern({cmd:'update-role_user'})
  async updateRoleStatus(updateRoleUserDto: UpdateRoleUserDto) {
    return await this.roleService.updateRoleUser(updateRoleUserDto);
  }


  
  
}
