import { Module } from '@nestjs/common';
import { PriceQuoteController } from './price_quote.controller';
import { PriceQuoteService } from './price_quote.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRICEQUOTE',
        transport: Transport.TCP,
        options: {
          host: 'price_quote_service',
          port: 3008,
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
    ]),
  ],
  controllers: [PriceQuoteController],
  providers: [PriceQuoteService],
  exports: [PriceQuoteService],
  // exports:[TypeOrmModule]
})
export class PriceQuoteModule {}
