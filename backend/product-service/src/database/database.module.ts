import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { TypeProducts } from './entities/type_product.entity';
import { UnitProduct } from './entities/unit_product.entity';
import { CodeProduct } from './entities/code_product.entity';
import { PictureProduct } from './entities/picture_product.entity';
import { SupplierProduct } from './entities/supplier_product.entity';
import { ActivityContainer } from './entities/activity_container.entity';
import { HistoryCodeProduct } from './entities/history_code_product.entity';
import { Brands } from './entities/brand.entity';
import { Originals } from './entities/original.entity';
import { ClassifyType } from './entities/classify_type.entity';
import { createConnection } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { CommentReportProduct } from './entities/comment_report_product.entity';
import { LikeReportProduct } from './entities/like_report_product.entity';
import { HistoryReportProduct } from './entities/history_report_product.entity';
import { ListDetail } from './entities/list_detail.entity';
import { Asset } from './entities/asset.entity';
import { HistoryAsset } from './entities/history_asset.entity';
import { AssetStatus } from './entities/asset_status.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connection = await createConnection({
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
        });
        await connection.query(
          `CREATE DATABASE IF NOT EXISTS ${configService.get<string>('DB_NAME')}`,
        );
        await connection.end();

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [
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
            AssetStatus
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
