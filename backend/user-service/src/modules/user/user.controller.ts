import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { AccountUsers } from 'src/database/entities/account_users.entity';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @MessagePattern({cmd:'register-user'})
  createUser(createUserDto:CreateUserDto): Promise<ResultResponse>{
    return this.userService.createUser(createUserDto)
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
