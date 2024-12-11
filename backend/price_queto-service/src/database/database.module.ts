import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceQuote } from './entities/price_quote.entity';
import { ListProduct } from './entities/list_product.entity';
import { ListParts } from './entities/list_part.entity';
import { ListDetailProduct } from './entities/list_detail_product.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'db_sparking_price_quote',
      entities: [PriceQuote,ListProduct,ListParts,ListDetailProduct],
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
