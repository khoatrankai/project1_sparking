import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposeController } from './propose.controller';
import { ProposeService } from './propose.service';
import { Propose } from 'src/database/entities/propose.entity';
import { ListProduct } from 'src/database/entities/list_product.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Propose,ListProduct])
  ],
  controllers: [ProposeController],
  providers: [ProposeService],
  // exports:[TypeOrmModule]
})
export class ProposeModule {}
