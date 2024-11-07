import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { PriceQuoteService } from './price_quote.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePriceQuoteDto } from 'src/dto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from 'src/dto/update_price_quote.dto';
import { GetFilterPriceQuoteDto } from 'src/dto/get_filter_price_quote.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class PriceQuoteController {
  constructor(private readonly priceQuoteService: PriceQuoteService) {}

  @Get()
  getHello(): string {
    return this.priceQuoteService.getHello();
  }
  @MessagePattern('create-price_quote')
  async createPriceQuote(createPriceQuoteDto: CreatePriceQuoteDto) {
    return await this.priceQuoteService.createPriceQuote(createPriceQuoteDto);
  }

  @MessagePattern('update-price_quote')
  async updatePriceQuote(updatePriceQuoteDto: UpdatePriceQuoteDto) {
    return await this.priceQuoteService.updatePriceQuote(updatePriceQuoteDto);
  }

  @MessagePattern('get-filter_price_quote')
  async getFilterPriceQuote(getFilterPriceQuote: GetFilterPriceQuoteDto) {
    return await this.priceQuoteService.getFilterPriceQuote(getFilterPriceQuote);
  }
  
}
