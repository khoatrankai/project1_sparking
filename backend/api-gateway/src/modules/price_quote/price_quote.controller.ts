import {  Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
// import { PriceQuetoService } from './price_queto.service';
import { CreatePriceQuoteDto } from './dto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from './dto/update_price_quote.dto';
import { PriceQuoteService } from './price_quote.service';
import { GetFilterPriceQuoteDto } from './dto/get_filter_price_quote.dto';




@Controller('price_quote')
export class PriceQuoteController {
  constructor(private readonly priceQuetoService: PriceQuoteService) {}

  @Get()
  getHello(): string {
    return this.priceQuetoService.getHello();
  }

  @Post()
  async createPriceQuote(@Body() createPriceQuoteDto: CreatePriceQuoteDto) {
    return this.priceQuetoService.sendCreatePriceQueto(createPriceQuoteDto);
  }

  @Put()
  async updatePriceQuote(@Body() updatePriceQuoteDto: UpdatePriceQuoteDto) {
    return this.priceQuetoService.sendUpdatePriceQueto(updatePriceQuoteDto);
  }

  @Get('get-filter')
  async getFilterPriceQuote(@Query() getFilterPriceQuoteDto: GetFilterPriceQuoteDto) {
    return this.priceQuetoService.sendGetFilterPriceQuote(getFilterPriceQuoteDto);
  }
  
}
