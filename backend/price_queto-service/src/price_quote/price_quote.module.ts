import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceQuoteController } from './price_quote.controller';
import { PriceQuoteService } from './price_quote.service';
import { PriceQuote } from 'src/database/entities/price_quote.entity';
import { ListProduct } from 'src/database/entities/list_product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [ ClientsModule.register([
    {
      name: 'USER',
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3005
      }
    },
    {
      name: 'PROJECT',
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3013
      }
    },
    {
      name: 'PRODUCT',
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3012
      }
    }
  ]),
    TypeOrmModule.forFeature([PriceQuote,ListProduct])
  ],
  controllers: [PriceQuoteController],
  providers: [PriceQuoteService],
  // exports:[TypeOrmModule]
})
export class PriceQuoteModule {}
