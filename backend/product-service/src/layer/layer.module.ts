import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { Products } from 'src/database/entities/product.entity';
import { TypeProducts } from 'src/database/entities/type_product.entity';
import { UnitProduct } from 'src/database/entities/unit_product.entity';
import { CodeProduct } from 'src/database/entities/code_product.entity';
import { PictureProduct } from 'src/database/entities/picture_product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Products,TypeProducts,UnitProduct,CodeProduct,PictureProduct])],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
