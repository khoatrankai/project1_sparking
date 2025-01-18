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
import { Brands } from 'src/database/entities/brand.entity';
import { Originals } from 'src/database/entities/original.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassifyType } from 'src/database/entities/classify_type.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SYSTEM',
        transport: Transport.TCP,
        options: {
          host: 'system_service',
          port: 3004,
        },
      },
    ]),

    TypeOrmModule.forFeature([
      Products,
      TypeProducts,
      UnitProduct,
      CodeProduct,
      PictureProduct,
      SupplierProduct,
      ActivityContainer,
      HistoryCodeProduct,
      Brands,
      Originals,
      ClassifyType,
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
