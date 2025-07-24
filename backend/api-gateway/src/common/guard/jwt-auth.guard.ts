import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctxType = context.getType();

    // 👉 Xử lý cho HTTP request
    if (ctxType === 'http') {
      const request: Request = context.switchToHttp().getRequest();
      const token = request.cookies?.['accessToken'];
      if (!token) return false;

      try {
        const user = this.jwtService.verify(token);
        request['user'] = user; // Gắn user vào request để controller dùng
        return true;
      } catch (err) {
        console.log('JWT HTTP verify failed:', err.message);
        return false;
      }
    }

    // 👉 Xử lý cho WebSocket (Socket.IO)
    if (ctxType === 'ws') {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const cookieHeader = client.handshake.headers?.cookie;
      if (!cookieHeader) return false;

      const parsedCookies = cookie.parse(cookieHeader);
      const token = parsedCookies['refreshToken'];
      if (!token) return false;

      try {
        const user = this.jwtService.verify(token);
        client['user'] = user; // Gắn user vào socket
        return true;
      } catch (err) {
        console.log('JWT WebSocket verify failed:', err.message);
        return false;
      }
    }

    // ❌ Nếu không phải HTTP hay WS thì từ chối
    return false;
  }
}
