import { Body, Controller, Get, Param, Post, Put, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
// import { RoleGuard } from 'src/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

 
  @Get('info')
  findOneInfo(@Query('user_id') user_id:string): Promise<InfoUserInterface>{
    return this.userService.findOneInfo(user_id)
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('picture_url',1))
  async updateUser(@Param('id') id:string,@Body() updateUserDto: UpdateUserDto,@UploadedFiles() picture_url:Express.Multer.File[]) {
    return await this.userService.updateUser(id,updateUserDto,picture_url?.[0]);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('picture_url',1))
  async createUser(@Body() createUserDto: CreateUserDto,@UploadedFiles() picture_url:Express.Multer.File[]) {
    return await this.userService.createUser(createUserDto,picture_url?.[0]);
  }
 
  @Post('create-role-type')
  async createRoleType(@Body() createRoleTypeUserDto: CreateRoleTypeUserDto) {
    return await this.userService.createRoleType(createRoleTypeUserDto);
  }

  
  @Put('update-role-type')
  async updateRoleType(@Body() updateRoleTypeUserDto: UpdateRoleTypeUserDto) {
    return await this.userService.updateRoleType(updateRoleTypeUserDto);
  }

  
  @Post('add-role-user')
  async addRoleUser(@Body() createRoleUserDto: CreateRoleUserDto) {
    return await this.userService.addRoleUser(createRoleUserDto);
  }


  
  @Put('update-role-user')
  async updateRoleUser (@Body() updateRoleUserDto: UpdateRoleUserDto) {
    return await this.userService.updateRoleUser(updateRoleUserDto);
  }


  // @UseGuards(RoleGuard)
  // @SetMetadata('checkfull',['all'])
  // @SetMetadata('roles',['info-all_us','admin'])
  @Get('all')
  async getUsers () {
    return await this.userService.getUsers();
  }


  @Get('/admin/id/:id')
  async getUserIDAdmin (@Param('id') id:string) {
    return await this.userService.getUserIDAdmin(id);
  }

  @Get('/profile')
  async getUserIDProfile (@Req() req:Request) {
    console.log(req['user'])
    return await this.userService.getUserIDProfile(req);
  }
 
}
