import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { Projects } from 'src/database/entities/project.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Projects])],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
