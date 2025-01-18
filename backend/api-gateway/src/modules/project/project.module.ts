import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
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
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
  // exports:[TypeOrmModule]
})
export class ProjectModule {}
