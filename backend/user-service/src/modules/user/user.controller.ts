import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { UpdateUserDto } from 'src/dto/update_user.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern({cmd:'get-user_id'})
  getUserID(@Payload() user_id:string){
    return this.userService.getUserID(user_id)
  }

  @MessagePattern({cmd:'get-user_id_admin'})
  getUserIDAdmin(@Payload('user_id') user_id:string){
    console.log(" goi toi ne",user_id)
    return this.userService.getUserIDAdmin(user_id)
  }

  @MessagePattern({cmd:'get-user_ids'})
  getUserIDs(@Payload() user_ids:string[]){
    return this.userService.getUserIDs(user_ids)
  }

  @MessagePattern({cmd:'register-user'})
  createUser(createUserDto:CreateUserDto): Promise<ResultResponse>{
    return this.userService.createUser(createUserDto)
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteTypeRole(datas: string[]) {
    return this.userService.deleteUser(datas);
  }

  @MessagePattern({cmd:'update-user'})
  updateUser( data:{user_id:string,updateUserDto:UpdateUserDto}): Promise<ResultResponse>{
    return this.userService.updateUser(data.user_id,data.updateUserDto)
  }

  @MessagePattern({cmd:'login-user'})
  findUser(username:string): Promise<AccountUsers>{
    return this.userService.findUser(username)
  }

  @MessagePattern({cmd:'get-users'})
  getUsers(){
    return this.userService.getUsers()
  }
  
}
