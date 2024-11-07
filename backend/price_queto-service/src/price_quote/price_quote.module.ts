import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceQuoteController } from './price_quote.controller';
import { PriceQuoteService } from './price_quote.service';
import { PriceQuote } from 'src/database/entities/price_queto.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([PriceQuote])
  ],
  controllers: [PriceQuoteController],
  providers: [PriceQuoteService],
  // exports:[TypeOrmModule]
})
export class PriceQuoteModule {}
