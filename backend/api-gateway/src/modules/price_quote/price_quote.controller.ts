import {  Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { PriceQuetoService } from './price_queto.service';
import { PriceQuoteService } from './price_quote.service';
import { CreatePriceQuoteDto } from './dto/PriceQuoteDto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from './dto/PriceQuoteDto/update_price_quote.dto';
import { PriceQuoteFilterDto } from './dto/PriceQuoteDto/get_filter_price_quote.dto';




@Controller('price_quote')
export class PriceQuoteController {
  constructor(private readonly priceQuetoService: PriceQuoteService) {}

  @Get()
  getHello(): string {
    return this.priceQuetoService.getHello();
  }

  @Get('all')
  getAll(@Query() filter?:PriceQuoteFilterDto) {
    return this.priceQuetoService.sendGetPriceQueto(filter);
  }

  @Get('id/:id')
  getOne(@Param() data:{id:string}) {
    console.log(data.id)
    return this.priceQuetoService.sendGetPriceQuetoID(data.id);
  }

  @Post()
  async createPriceQuote(@Body() createPriceQuoteDto: CreatePriceQuoteDto) {
    return this.priceQuetoService.sendCreatePriceQueto(createPriceQuoteDto);
  }

  @Put()
  async updatePriceQuote(@Body() updatePriceQuoteDto: UpdatePriceQuoteDto) {
    return this.priceQuetoService.sendUpdatePriceQueto(updatePriceQuoteDto);
  }

  // @Get('get-filter')
  // async getFilterPriceQuote(@Query() getFilterPriceQuoteDto: GetFilterPriceQuoteDto) {
  //   return this.priceQuetoService.sendGetFilterPriceQuote(getFilterPriceQuoteDto);
  // }
  
}
