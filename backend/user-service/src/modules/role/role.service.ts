import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { RoleUser } from 'src/database/entities/role_user.entity';
import { RoleTypeUser } from 'src/database/entities/role_type_user.entity';
import { CreateRoleTypeUserDto } from 'src/dto/create_role.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateRoleTypeUserDto } from 'src/dto/update_role.dto';
import { CreateRoleUserDto } from 'src/dto/create_role_user.dto';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { UpdateRoleUserDto } from 'src/dto/update_role_user.dto';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(RoleUser) private readonly roleUserRepository:Repository<RoleUser>,private configService: ConfigService,@InjectRepository(RoleTypeUser) private readonly roleTypeUserRepository:Repository<RoleTypeUser>,@InjectRepository(AccountUsers) private readonly accountUserRepository:Repository<AccountUsers>){}
  getHello(): string {
    return 'Hello World!';
  }

  async createTypeRole(createRoleType:CreateRoleTypeUserDto){
    try{
      const id = uuidv4()
      const dataNew = this.roleTypeUserRepository.create({...createRoleType,role_type_id: id})
      await this.roleTypeUserRepository.save(dataNew)
      return {
        statusCode:HttpStatus.CREATED
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
    
  }

  async updateTypeRole(updateTypeRole:UpdateRoleTypeUserDto){
    try{
      await this.roleTypeUserRepository.update(updateTypeRole.role_type_id,updateTypeRole)
      return {
        statusCode:HttpStatus.OK
      }
    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
    
  }

  async addRoleUser(createRoleUser:CreateRoleUserDto){
    try{
      const id = uuidv4()
      const roleType = await this.roleTypeUserRepository.findOne({where:{role_type_id:createRoleUser.role_type}})
      const accountUser = await this.accountUserRepository.findOne({where:{user_id:createRoleUser.user_info}})
      if(roleType && accountUser){
        const dataNew = this.roleUserRepository.create({...createRoleUser,role_type:roleType,user_info:accountUser,role_id:id})
        await this.roleUserRepository.save(dataNew)
        return {
          statusCode:HttpStatus.CREATED
        }
      }else{
        return {
          statusCode:HttpStatus.BAD_REQUEST
        }
      }
     

    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
 
  }

  async checkRoleUser(user_id:string,name_tag:string){
    try{
     const user = await this.accountUserRepository.findOne({where:{user_id}})
     const role = await this.roleTypeUserRepository.findOne({where:{name_tag:name_tag}})
     if (!user || !role) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
     const check = await this.roleUserRepository.findOne({where:{user_info:user,role_type:role,status:true}})
     if(check){
      return {
        statusCode:HttpStatus.OK
      }
     }
     return {
      statusCode:HttpStatus.BAD_REQUEST
    }
     

    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
 
  }

  async updateRoleUser(updateRoleUser:UpdateRoleUserDto){
    try{
      await this.roleUserRepository.update(updateRoleUser.role_id,updateRoleUser)
      return {
        statusCode:HttpStatus.OK
      }

    }catch{
      return {
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
 
  }
 
 
}
