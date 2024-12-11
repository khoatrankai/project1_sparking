import { HttpStatus, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { UserResponse } from 'src/interfaces/user.interface';
// import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { decryptJson, encryptJson } from 'src/common/utils/crypto-user.util';
import * as speakeasy from 'speakeasy'
import { VerifyUserDto } from 'src/dto/verify-user.dto';
import { CreateUserDto } from 'src/dto/create_user.dto';

@Injectable()
export class AuthService {

  constructor(@Inject('USER') private readonly usersClient:ClientProxy,@Inject('MAIL') private readonly mailClient:ClientProxy,private jwtService: JwtService,private configService: ConfigService){}
  getHello(): string {
    return 'Hello World!';
  }

  checkIsEmail(data:string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
  }

  checkIsPhoneNumber(data:string){
    const phoneRegex = /^\+?\d{10,15}$/; 
    return phoneRegex.test(data);
  }


  async register(otpUserDto:CreateUserDto){
    const checkUser =  await firstValueFrom(this.usersClient.send({cmd:'login-user'},otpUserDto.email))
    console.log(checkUser)
    if(checkUser){
      return {
        statusCode: HttpStatus.BAD_REQUEST,message:'Tài khoản đã tồn tại'
      }
    }
    const secret = speakeasy.generateSecret({ length: 20 }).base32
    const otp = speakeasy.totp({
      secret: secret, 
      encoding: 'base32',
      step: 300, 
    });
    
    if(this.checkIsEmail(otpUserDto.email)){
      const data = encryptJson({...otpUserDto},this.configService.get<string>('CRYPTO_SECRET'))
      return await firstValueFrom(this.mailClient.send({cmd:'send-email'},{to:otpUserDto.email,subject:'Tin nhắn xác nhận',text:`http://localhost:3001/auth/verify?otp=${otp}&data=${data}&secret=${secret}`}))
      
    }
    
    return {statusCode: HttpStatus.BAD_REQUEST,message:'Thông tin tài khoản không phù hợp'}
   
  }

  async verify(verifyUserDto:VerifyUserDto){
    const verified = speakeasy.totp.verify({
      secret: verifyUserDto.secret,
      encoding: 'base32',
      token: verifyUserDto.otp,
      step: 300, 
      window: 1, 
    });
    if(verified){
      const dataEncord = decryptJson(verifyUserDto.data,this.configService.get<string>('CRYPTO_SECRET'))
      if(Object.keys(dataEncord).length>0){
        return this.usersClient.send({cmd:'register-user'},dataEncord)
      }
    }else{
      return {statusCode:HttpStatus.BAD_REQUEST,message:'Hết hạn otp'}
    }
    
  }

  async login(userLoginDto:UserLoginDto){
    const user = await firstValueFrom(this.usersClient.send({cmd:'login-user'},userLoginDto.email))
    if(user){
      const payload = {email : user.email,sub: user.user_id,role:'admin'}
      const accessToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'] });
      return {accessToken,refreshToken}
    }
    throw new InternalServerErrorException
  }
  async refreshTokens(refreshToken:string) {  
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      });

      const newAccessToken = this.jwtService.sign({ ...payload }, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      return {newAccessToken}
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async comfirmAccessToken(accessToken:string) {  
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      });

      // const newAccessToken = this.jwtService.sign({ ...payload }, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      return {
        statusCode:HttpStatus.OK,
        data:payload
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
