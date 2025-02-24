import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceQuoteController } from './price_quote.controller';
import { PriceQuoteService } from './price_quote.service';
import { PriceQuote } from 'src/database/entities/price_quote.entity';
import { ListProduct } from 'src/database/entities/list_product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ListParts } from 'src/database/entities/list_part.entity';
import { ListDetailProduct } from 'src/database/entities/list_detail_product.entity';
import { TypePackage } from 'src/database/entities/type_package.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user_service',
          port: 3005,
        },
      },
      {
        name: 'OPPORTUNITY',
        transport: Transport.TCP,
        options: {
          host: 'opportunity_service',
          port: 3011,
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
        name: 'PRODUCT',
        transport: Transport.TCP,
        options: {
          host: 'product_service',
          port: 3012,
        },
      },
      {
        name: 'SYSTEM',
        transport: Transport.TCP,
        options: {
          host: 'system_service',
          port: 3004,
        },
      },
      {
        name: 'CUSTOMER',
        transport: Transport.TCP,
        options: {
          host: 'customer_service',
          port: 3006,
        },
      }
    ]),
    TypeOrmModule.forFeature([
      PriceQuote,
      ListProduct,
      ListParts,
      ListDetailProduct,
      TypePackage,
    ]),
  ],
  controllers: [PriceQuoteController],
  providers: [PriceQuoteService],
  // exports:[TypeOrmModule]
})
export class PriceQuoteModule {}
