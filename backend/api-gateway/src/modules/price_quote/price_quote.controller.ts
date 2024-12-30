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
    return this.priceQuetoService.sendGetPriceQuetoID(data.id);
  }

  @Get('export/:id')
  getOneExport(@Param() data:{id:string}) {
    return this.priceQuetoService.exportExcelPriceQuote(data.id);
  }

  @Post()
  async createPriceQuote(@Body() createPriceQuoteDto: CreatePriceQuoteDto) {
    // console.log(createPriceQuoteDto.parts[0].products[0].list_detail)
    return this.priceQuetoService.sendCreatePriceQueto(createPriceQuoteDto);
    return ""
  }

  @Put('id/:id')
  async updatePriceQuote(@Param('id') id:string,@Body() updatePriceQuoteDto: UpdatePriceQuoteDto) {
    return this.priceQuetoService.sendUpdatePriceQueto(id,updatePriceQuoteDto);
  }

  @Put('list')
  async updateStatusPriceQuote(@Body() updatePriceQuoteDto: {price_quote_id:string,status:string}[]) {
    return this.priceQuetoService.sendUpdateStatusPriceQueto(updatePriceQuoteDto);
  }

  // @Get('get-filter')
  // async getFilterPriceQuote(@Query() getFilterPriceQuoteDto: GetFilterPriceQuoteDto) {
  //   return this.priceQuetoService.sendGetFilterPriceQuote(getFilterPriceQuoteDto);
  // }
  
}
