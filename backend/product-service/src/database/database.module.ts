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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const connection = await createConnection({
          host: 'localhost',
          user: 'root',
          password: '123456789',
        });

        // Tạo database nếu không tồn tại
        await connection.query(
          `CREATE DATABASE IF NOT EXISTS db_sparking_product`,
        );
        await connection.end();

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456789',
          database: 'db_sparking_product',
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
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
