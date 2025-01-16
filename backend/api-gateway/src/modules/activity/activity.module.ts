import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    ClientsModule.register([
      {
        name: 'ACTIVITY',
        transport: Transport.TCP,
        options: {
          host: 'activity-service',
          port: 3014,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user-service',
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
  // exports:[TypeOrmModule]
})
export class ActivityModule {}
