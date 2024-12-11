import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { VerifyUserDto } from 'src/dto/verify-user.dto';
import { CreateUserDto } from 'src/dto/create_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({cmd:'register'})
  registerUser(otpUserDto:CreateUserDto){
    return this.authService.register(otpUserDto)
  }

  @MessagePattern({cmd:'verify'})
  verifyUser(verifyUserDto:VerifyUserDto){
    return this.authService.verify(verifyUserDto)
  }

  @MessagePattern({cmd:'login'})
  loginUser(userLoginDto:UserLoginDto){
    return this.authService.login(userLoginDto)
  }

  @MessagePattern({cmd:'refresh-token'})
  refreshToken(data:string){
    return this.authService.refreshTokens(data)
  }

  @MessagePattern({cmd:'comfirm-access-token'})
  comfirmAccessToken(data:string){
    return this.authService.comfirmAccessToken(data)
  }
  
}
