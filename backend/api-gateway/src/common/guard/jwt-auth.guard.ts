import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    try {
      const user = this.jwtService.verify(token);
      if(user)
      {
        request['user'] = user
        return true;
      }
      
      else return false
    } catch (err) {
      return false; 
    }
  }
}
