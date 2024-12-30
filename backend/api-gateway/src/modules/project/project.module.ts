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
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3013
        }
      }
    ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
  // exports:[TypeOrmModule]
})
export class ProjectModule {}
