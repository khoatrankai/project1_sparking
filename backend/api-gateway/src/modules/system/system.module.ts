import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SYSTEM',
        transport: Transport.TCP,
        options: {
          host: 'system_service',
          port: 3004,
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
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService],
  // exports:[TypeOrmModule]
})
export class SystemModule {}
