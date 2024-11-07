import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[
    ClientsModule.register([
     
      {
        name: 'AUTH',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3002
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
