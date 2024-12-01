import { Controller, Get, HttpStatus, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { PriceQuoteService } from './price_quote.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePriceQuoteDto } from 'src/dto/PriceQuoteDto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from 'src/dto/PriceQuoteDto/update_price_quote.dto';
import { UpdateListProductDto } from 'src/dto/ListProductDto/update_list_product.dto';
import { PriceQuoteFilterDto } from 'src/dto/PriceQuoteDto/get_filter_price_quote.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class PriceQuoteController {
  constructor(private readonly priceQuoteService: PriceQuoteService) {}

  @Get()
  getHello(): string {
    return this.priceQuoteService.getHello();
  }

  @MessagePattern({ cmd: 'create-price_quote' })
  async createPriceQuote(@Payload() createPriceQuoteDto: CreatePriceQuoteDto) {
    return await this.priceQuoteService.createPriceQuote(createPriceQuoteDto);
  }

  @MessagePattern({ cmd: 'find-one_price_quote' })
  async findOnePriceQuote(@Payload() id: string) {
    const priceQuote = await this.priceQuoteService.findOnePriceQuote(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Price quote retrieved successfully',
      data: priceQuote,
    };
  }

  @MessagePattern({ cmd: 'find-one_full_price_quote' })
  async findOneFullPriceQuote(@Payload() id: string) {
    const priceQuote = await this.priceQuoteService.findOneFullPriceQuote(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Price quote retrieved successfully',
      data: priceQuote,
    };
  }

  @MessagePattern({ cmd: 'find-all_price_quotes' })
  async findAllPriceQuote(@Payload() filter?: PriceQuoteFilterDto) {
    const priceQuotes = await this.priceQuoteService.findAllPriceQuote(filter);
    return {
      statusCode: HttpStatus.OK,
      message: 'All price quotes retrieved successfully',
      data: priceQuotes,
    };
  }

  @MessagePattern({ cmd: 'update-price_quote' })
  async updatePriceQuote(@Payload() payload: { id: string; data: UpdatePriceQuoteDto }) {
    const { id, data } = payload;
    const updatedPriceQuote = await this.priceQuoteService.updatePriceQuote(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Price quote updated successfully',
      data: updatedPriceQuote,
    };
  }

  // @MessagePattern({ cmd: 'create-list_product' })
  // async createListProduct(@Payload() createListProductDto: CreateListProductDto) {
  //   const listProduct = await this.priceQuoteService.createListProduct(createListProductDto);
  //   return {
  //     statusCode: HttpStatus.CREATED,
  //     message: 'List product created successfully',
  //     data: listProduct,
  //   };
  // }

  @MessagePattern({ cmd: 'find-one_list_product' })
  async findOneListProduct(@Payload() id: string) {
    const listProduct = await this.priceQuoteService.findOneListProduct(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'List product retrieved successfully',
      data: listProduct,
    };
  }

  @MessagePattern({ cmd: 'find-all_list_products' })
  async findAllListProduct() {
    const listProducts = await this.priceQuoteService.findAllListProduct();
    return {
      statusCode: HttpStatus.OK,
      message: 'All list products retrieved successfully',
      data: listProducts,
    };
  }

  @MessagePattern({ cmd: 'update-list_product' })
  async updateListProduct(@Payload() payload: { id: string; updateListProductDto: UpdateListProductDto }) {
    const { id, updateListProductDto } = payload;
    const updatedListProduct = await this.priceQuoteService.updateListProduct(id, updateListProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'List product updated successfully',
      data: updatedListProduct,
    };
  }

  @MessagePattern({ cmd: 'delete-list_product' })
  async removeListProduct(@Payload() id: string) {
    await this.priceQuoteService.removeListProduct(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'List product deleted successfully',
    };
  }

  
  
}
