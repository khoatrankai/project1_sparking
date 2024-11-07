import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = jwt.verify(token.split(' ')[1], 'your-secret-key');
      req['user'] = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}