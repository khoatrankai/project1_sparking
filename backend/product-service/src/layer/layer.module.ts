import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { Products } from 'src/database/entities/product.entity';
import { TypeProducts } from 'src/database/entities/type_product.entity';
import { UnitProduct } from 'src/database/entities/unit_product.entity';
import { CodeProduct } from 'src/database/entities/code_product.entity';
import { PictureProduct } from 'src/database/entities/picture_product.entity';
import { SupplierProduct } from 'src/database/entities/supplier_product.entity';
import { ActivityContainer } from 'src/database/entities/activity_container.entity';
import { HistoryCodeProduct } from 'src/database/entities/history_code_product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Products,TypeProducts,UnitProduct,CodeProduct,PictureProduct,SupplierProduct,ActivityContainer,HistoryCodeProduct])],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
