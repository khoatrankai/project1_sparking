import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'
import { In, Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { UpdateUserDto } from 'src/dto/update_user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(AccountUsers) private readonly accountUserRepository:Repository<AccountUsers>,private configService: ConfigService){}
  getHello(): string {
    return 'Hello World!';
  }


  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, Number(this.configService.get<string>('SALT')));
    return hashedPassword;
  }

  private extractDuplicateField(errorMessage: string): string {
    const match = errorMessage.match(/for key '([^']+)'/);
    const allConfig = {
      email: this.configService.get<string>('IDX_USERS_EMAIL'),
      phone: this.configService.get<string>('IDX_USERS_PHONE')
    }
   return match ? allConfig.email === match[1].replace('users.','')?'email':'phone' : 'dữ liệu'
  }

  async createUser(registerDto:CreateUserDto): Promise<ResultResponse>{
    try{
      const id = uuidv4()
      const pass = await this.hashPassword(registerDto.password)
      const user =  this.accountUserRepository.create({...registerDto,user_id:id,password:pass})
      await this.accountUserRepository.save(user)
      return {
        statusCode:HttpStatus.CREATED,
        message: 'Tạo tài khoản thành công'

      }
    }catch(err){
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`)
      }
      
      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
      
    
  }

  async updateUser(user_id:string,updateDto:UpdateUserDto): Promise<ResultResponse>{
    try{
      const pass = await this.hashPassword(updateDto.password)
      await  this.accountUserRepository.update(user_id,{...updateDto,password:pass})
      return {
        statusCode:HttpStatus.CREATED,
        message: 'Cập nhật tài khoản thành công'

      }
    }catch(err){
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`)
      }
      
      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async findUser(email:string):Promise<AccountUsers>{
    const data = await this.accountUserRepository.findOne({where:{email:email }})
    return data
  }

  async getUsers(){
    const data = await this.accountUserRepository.find({select:['first_name','last_name','email','phone_number','picture_url','user_id','status'],where:{status:Not('delete')}});
    return data
  }

  async getUserID(user_id:string){
    const data = await this.accountUserRepository.findOne({select:['first_name','last_name','email','picture_url','user_id','phone_number'],where:{user_id}});
    return data
  }

  async getUserIDAdmin(user_id:string){
    const data = await this.accountUserRepository.findOne({where:{user_id}});
    delete data.password
    return {
      statusCode:HttpStatus.OK,
      data:data
    }
  }

  async getUserIDs(user_ids:string[]){
    const data = await this.accountUserRepository.find({select:['first_name','last_name','email','picture_url','user_id'],where:{user_id:In(user_ids)}});
    const sortedData = user_ids.map(id => data.find(user => user.user_id === id))
    return sortedData
  }
 
}
