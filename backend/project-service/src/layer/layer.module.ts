import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { Projects } from 'src/database/entities/project.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeProject } from 'src/database/entities/type_project.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3006,
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
    TypeOrmModule.forFeature([Projects, TypeProject]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
