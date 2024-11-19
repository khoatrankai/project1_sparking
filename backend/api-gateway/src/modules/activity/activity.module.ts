import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACTIVITY',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3014
        }
      }
    ])
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
  // exports:[TypeOrmModule]
})
export class ActivityModule {}
