import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { Projects } from 'src/database/entities/project.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
  imports: [ClientsModule.register([
    {
      name: 'CUSTOMER',
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3006
      }
    }
  ]),TypeOrmModule.forFeature([Projects])],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
