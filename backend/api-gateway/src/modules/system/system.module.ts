import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SYSTEM',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3004
        }
      }
    ])
  ],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService]
  // exports:[TypeOrmModule]
})
export class SystemModule {}
