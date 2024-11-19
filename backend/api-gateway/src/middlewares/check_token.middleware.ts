import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  private readonly jwtSecret: string;
  constructor(private configService: ConfigService) {
    this.jwtSecret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
  }
  use(req: Request, res: Response, next: NextFunction) {
    try{
      const token = req.cookies['accessToken'] || req.headers['authorization']?.split(' ')[1];
      if(token){
        const decoded = jwt.verify(token, this.jwtSecret);
        if(decoded){
          req['user'] = decoded;
    
        }
      }else{
        const refresh = req.cookies['refreshToken'] || req.headers['authorization']?.split(' ')[1];
        if(refresh){
          const payload = jwt.verify(refresh, this.jwtSecret);
          delete payload['exp'];
          const newAccessToken = jwt.sign(payload,this.jwtSecret,{expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN')})
          res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
              secure: true,
              sameSite: 'strict',
              });
          if(payload){
                req['user'] = payload;
          }
         
          
        }
      }
     

    }catch{
      
     
      
    }finally{
      next()
    }
   
  }
}