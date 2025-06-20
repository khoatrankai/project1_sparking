// role.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('USER') private readonly usersClient: ClientProxy, // Inject service để truy vấn quyền từ database
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkfull = this.reflector.get<string[]>(
      'checkfull',
      context.getHandler(),
    );
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const type = this.reflector.get<string[]>('type', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    if (checkfull && user) {
      return true;
    }

    if (!user) {
      return false;
    }
    if (!roles) {
      return true;
    }
    const role = user['role'];
    if (type.length > 1) {
       if (role === 'admin') {
        const check = await firstValueFrom(
          this.usersClient.send(
            { cmd: 'check-role_user' },
            { user_id: user['sub'], role_name_tag: roles },
          ),
        );
        if (check.statusCode === 200) {
          return true;
        }
        return false;
      } else {
        if (type[0] === 'admin') {
          if (role === 'admin') {
            const check = await firstValueFrom(
              this.usersClient.send(
                { cmd: 'check-role_user' },
                { user_id: user['sub'], role_name_tag: roles },
              ),
            );
            if (check.statusCode === 200) {
              return true;
            }
            return false;
          }
        } 
        if (type[1] === 'customer') {
          if (role === 'customer') {
            return true
          }
        } 
      }
    } else {
      if (role === 'admin') {
        const check = await firstValueFrom(
          this.usersClient.send(
            { cmd: 'check-role_user' },
            { user_id: user['sub'], role_name_tag: roles },
          ),
        );
        if (check.statusCode === 200) {
          return true;
        }
        return false;
      } else {
        if (type[0] === 'admin') {
          if (role === 'admin') {
            const check = await firstValueFrom(
              this.usersClient.send(
                { cmd: 'check-role_user' },
                { user_id: user['sub'], role_name_tag: roles },
              ),
            );
            if (check.statusCode === 200) {
              return true;
            }
            return false;
          }
        } 
        if (type[1] === 'customer') {
          if (role === 'customer') {
            return true
          }
        } 
      }
    }

    return false;
    // Kiểm tra xem user có quyền phù hợp hay không
  }
}
