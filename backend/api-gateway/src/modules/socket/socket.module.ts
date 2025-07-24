import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
      ClientsModule.register([
        {
          name: 'PROJECT',
          transport: Transport.TCP,
          options: {
            host: 'project_service',
            port: 3013,
          },
        },
        {
          name: 'USER',
          transport: Transport.TCP,
          options: {
            host: 'user_service',
            port: 3005,
          },
        },
      ]),
    ],
  providers: [SocketGateway],
})
export class SocketModule {}
