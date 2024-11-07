import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
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
      if (err.code === 'ER_DUP_ENTRY') {
        
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`)
      }
      
      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
      
    
  }

  async updateUser(user_id:string,updateDto:UpdateUserDto):Promise<AccountUsers>{
    await this.accountUserRepository.update(user_id,updateDto);
    return this.accountUserRepository.findOne({where:{user_id: user_id}})
  }

  async findUser(email:string):Promise<AccountUsers>{
    const data = await this.accountUserRepository.findOne({where:{email:email }})
    return data
  }

  async getUsers(){
    const data = await this.accountUserRepository.find({select:['first_name','last_name','email','picture_url','user_id'],where:{status:'active'}});
    return data
  }
 
}
