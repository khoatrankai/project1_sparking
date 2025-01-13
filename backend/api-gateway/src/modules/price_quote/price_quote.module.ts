import { Module } from '@nestjs/common';
import {PriceQuoteController } from './price_quote.controller';
import { PriceQuoteService } from './price_quote.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRICEQUOTE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3008
        }
      },
      {
        name: 'USER',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3005
        }
      }
    ])
  ],
  controllers: [PriceQuoteController],
  providers: [PriceQuoteService],
  exports: [PriceQuoteService]
  // exports:[TypeOrmModule]
})
export class PriceQuoteModule {}
