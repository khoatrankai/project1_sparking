import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request, Response } from "express";
import { firstValueFrom } from "rxjs";

import { TokenResponse } from "src/modules/auth/interfaces/token.interface";
import { CreateUserDto } from "./dto/create_user.dto";
import { VerifyUserDto } from "./dto/verify_user.dto";
import { UserLoginDto } from "./dto/user_login.dto";


@Injectable()
export class AuthService {

  constructor(@Inject('AUTH') private readonly authClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  createUser(otpUserDto: CreateUserDto){
    const data = this.authClient.send({cmd:'register'},otpUserDto)
    return data
  }

  verifyUser(verifyUserDto:VerifyUserDto){
    console.log(verifyUserDto)
    const data = this.authClient.send({cmd:'verify'},verifyUserDto)
    return data
  }

  async loginUser(userLoginDto:UserLoginDto,res:Response){
    try{
      const data:TokenResponse = await firstValueFrom(this.authClient.send({cmd:'login'},userLoginDto))
      res.cookie('accessToken', data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        });
  
        res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        });
        return res.json({
          statusCode:HttpStatus.OK,
          message:'Đăng nhập thành công'
        })
    }catch(err){
      return res.json({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'Đăng nhập thất bại'
      })
    }
    
  }

  async refreshToken(res:Response,req:Request){
    try{
      const newAccessToken:string = await firstValueFrom(this.authClient.send({cmd:'refresh-token'},req.cookies['refreshToken']))
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        });
        return res.json({
          statusCode:HttpStatus.OK,
          message:'RefreshToken Success'
        })
    }catch(err){
      return res.json({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'RefreshToken Fail'
      })
    }
    
  }
}
