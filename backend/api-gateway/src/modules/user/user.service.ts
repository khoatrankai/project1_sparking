import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InfoUserInterface } from './interfaces/info-user.interface';
import { CreateRoleTypeUserDto } from './dto/create_role.dto';
import { UpdateRoleTypeUserDto } from './dto/update_role.dto';
import { CreateRoleUserDto } from './dto/create_role_user.dto';
import { UpdateRoleUserDto } from './dto/update_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class UserService {

  constructor(private readonly cloudinaryService:CloudinaryService,@Inject('USER') private readonly usersClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

 
  async findOneInfo(user_id:string):Promise<InfoUserInterface> {
    try{
      const dataInfo = await firstValueFrom(this.usersClient.send({cmd:'find-profile'},user_id))
      return dataInfo
    }catch(err){
      throw new InternalServerErrorException
    }
    
  }

  async createRoleType(createRoleTypeUserDto: CreateRoleTypeUserDto) {
    return this.usersClient.send({ cmd: 'create-role_type' }, createRoleTypeUserDto);
  }

  async updateRoleType(updateRoleTypeUserDto: UpdateRoleTypeUserDto) {
    return this.usersClient.send({ cmd: 'update-role_type' }, updateRoleTypeUserDto);
  }

  async addRoleUser(createRoleUserDto: CreateRoleUserDto) {
    return this.usersClient.send({ cmd: 'add-role_user' }, createRoleUserDto);
  }



  async updateRoleUser(updateRoleUserDto: UpdateRoleUserDto) {
    return this.usersClient.send({ cmd: 'update-role_user' }, updateRoleUserDto);
  }


  async createUser(createUserDto: CreateUserDto,picture_url:Express.Multer.File) {
    const data = await this.cloudinaryService.uploadFile(picture_url)
    console.log(data)
    return this.usersClient.send({cmd:'register-user'}, {...createUserDto,picture_url:data.secure_url});
  }

  async getUsers(){
    return {
      statusCode:HttpStatus.OK,
      data:await firstValueFrom(this.usersClient.send({ cmd: 'get-users' }, {}))
    }
    
  }

  
  async getUserIDAdmin(user_id:string){
    return await firstValueFrom(this.usersClient.send({ cmd: 'get-user_id_admin' }, user_id))
    
  }
}
