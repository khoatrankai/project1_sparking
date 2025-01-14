import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceQuote } from './entities/price_quote.entity';
import { ListProduct } from './entities/list_product.entity';
import { ListParts } from './entities/list_part.entity';
import { ListDetailProduct } from './entities/list_detail_product.entity';
import { TypePackage } from './entities/type_package.entity';
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
          `CREATE DATABASE IF NOT EXISTS db_sparking_price_quote`,
        );
        await connection.end();

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456789',
          database: 'db_sparking_price_quote',
          entities: [
            PriceQuote,
            ListProduct,
            ListParts,
            ListDetailProduct,
            TypePackage,
          ],
          // synchronize: true,
          // dropSchema: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
