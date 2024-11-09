import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { TypeOpportunities } from 'src/database/entities/type_activity.entity';
import { TypeSources } from 'src/database/entities/type_source.entity';
import { Opportunities } from 'src/database/entities/opportunity.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TypeOpportunities,TypeSources,Opportunities])],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
