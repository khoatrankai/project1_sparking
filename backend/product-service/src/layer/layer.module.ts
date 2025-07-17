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
import { CommentReportProduct } from 'src/database/entities/comment_report_product.entity';
import { LikeReportProduct } from 'src/database/entities/like_report_product.entity';
import { HistoryReportProduct } from 'src/database/entities/history_report_product.entity';
import { ListDetail } from 'src/database/entities/list_detail.entity';
import { Asset } from 'src/database/entities/asset.entity';
import { HistoryAsset } from 'src/database/entities/history_asset.entity';
import { AssetStatus } from 'src/database/entities/asset_status.entity';
import { Warranty } from 'src/database/entities/warranty.entity';

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
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user_service',
          port: 3005,
        },
      },
      {
        name: 'CUSTOMER',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3006,
        },
      },
      {
              name: 'PROJECT',
              transport: Transport.TCP,
              options: {
                host: 'project_service',
                port: 3013,
              },
            },
            {
              name: 'ACTIVITY',
              transport: Transport.TCP,
              options: {
                host: 'activity_service',
                port: 3014,
              },
            },
            {
              name: 'CONTRACT',
              transport: Transport.TCP,
              options: {
                host: 'contract_service',
                port: 3010,
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
      CommentReportProduct,
      LikeReportProduct,
      HistoryReportProduct,
      ListDetail,
      Asset,
      HistoryAsset,
      Warranty,
      AssetStatus
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
  // exports:[TypeOrmModule]
})
export class LayerModule {}
