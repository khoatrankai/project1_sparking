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
    try {
      const token =
        req.cookies['accessToken'] ||
        req.headers['authorization']?.split(' ')[1];
      const tokenCustomer =
        req.cookies['accessTokenCustomer'] ||
        req.headers['authorization']?.split(' ')[1];

      //ADMIN
      if (token) {
        try {
          const decoded = jwt.verify(token, this.jwtSecret);
          if (decoded) {
            req['user'] = decoded;
          }
        } catch {
          const refresh =
            req.cookies['refreshToken'] ||
            req.headers['authorization']?.split(' ')[1];
          if (refresh) {
            try {
              const payload = jwt.verify(refresh, this.jwtSecret);
              delete payload['exp'];
              const newAccessToken = jwt.sign(payload, this.jwtSecret, {
                expiresIn: this.configService.get<string>(
                  'JWT_ACCESS_TOKEN_EXPIRES_IN',
                ),
              });
              res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
              });
              if (payload) {
                req['user'] = payload;
              }
            } catch {}
          }
        }
      } else {
        const refresh =
          req.cookies['refreshToken'] ||
          req.headers['authorization']?.split(' ')[1];
        if (refresh) {
          try {
            const payload = jwt.verify(refresh, this.jwtSecret);
            delete payload['exp'];
            const newAccessToken = jwt.sign(payload, this.jwtSecret, {
              expiresIn: this.configService.get<string>(
                'JWT_ACCESS_TOKEN_EXPIRES_IN',
              ),
            });
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
            });
            if (payload) {
              req['user'] = payload;
            }
          } catch {}
        }
      }

      //CUSTOMER
      if (tokenCustomer) {
        try {
          const decoded = jwt.verify(tokenCustomer, this.jwtSecret);
          if (decoded) {
            req['customer'] = decoded;
          }
        } catch {
          const refresh =
            req.cookies['refreshTokenCustomer'] ||
            req.headers['authorization']?.split(' ')[1];
          if (refresh) {
            try {
              const payload = jwt.verify(refresh, this.jwtSecret);
              delete payload['exp'];
              const newAccessToken = jwt.sign(payload, this.jwtSecret, {
                expiresIn: this.configService.get<string>(
                  'JWT_ACCESS_TOKEN_EXPIRES_IN',
                ),
              });
              res.cookie('accessTokenCustomer', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
              });
              if (payload) {
                req['customer'] = payload;
              }
            } catch {}
          }
        }
      } else {
        const refresh =
          req.cookies['refreshTokenCustomer'] ||
          req.headers['authorization']?.split(' ')[1];
        if (refresh) {
          try {
            const payload = jwt.verify(refresh, this.jwtSecret);
            delete payload['exp'];
            const newAccessToken = jwt.sign(payload, this.jwtSecret, {
              expiresIn: this.configService.get<string>(
                'JWT_ACCESS_TOKEN_EXPIRES_IN',
              ),
            });
            res.cookie('accessTokenCustomer', newAccessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
            });
            if (payload) {
              req['customer'] = payload;
            }
          } catch {}
        }
      }
    } catch {
    } finally {
      next();
    }
  }
}
