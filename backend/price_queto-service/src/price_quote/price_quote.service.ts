import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceQuoteDto } from 'src/dto/PriceQuoteDto/create_price_quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceQuote } from 'src/database/entities/price_quote.entity';
import { v4 as uuidv4 } from 'uuid';

import {Repository } from 'typeorm';
import { UpdatePriceQuoteDto } from 'src/dto/PriceQuoteDto/update_price_quote.dto';
import { CreateListProductDto } from 'src/dto/ListProductDto/create_list_product.dto';
import { ListProduct } from 'src/database/entities/list_product.entity';
import { UpdateListProductDto } from 'src/dto/ListProductDto/update_list_product.dto';


@Injectable()
export class PriceQuoteService {

  constructor(@InjectRepository(PriceQuote) private readonly priceQuoteRepository:Repository<PriceQuote>, @InjectRepository(ListProduct)
  private listProductRepository: Repository<ListProduct>){}
  getHello(): string {
    return 'Hello World!';
  }
  async createPriceQuote(createPriceQuoteDto: CreatePriceQuoteDto): Promise<PriceQuote> {
    const priceQuote = this.priceQuoteRepository.create({...createPriceQuoteDto,price_quote_id:uuidv4()});
    return await this.priceQuoteRepository.save(priceQuote);
  }

  async findOnePriceQuote(id: string) {
    const priceQuote = await this.priceQuoteRepository.findOne({ where: { price_quote_id: id },relations: ['products'] });
    if (!priceQuote) {
      throw new NotFoundException(`PriceQuote with ID ${id} not found`);
    }
    return priceQuote;
  }

  async findAllPriceQuote() {
    return await this.priceQuoteRepository.find({ relations: ['products'] });
  }

  async updatePriceQuote(id: string, updatePriceQuoteDto: UpdatePriceQuoteDto) {
    await this.priceQuoteRepository.update(id, updatePriceQuoteDto);
    const updatedPriceQuote = await this.priceQuoteRepository.findOne({ where: { price_quote_id: id } });
    if (!updatedPriceQuote) {
      throw new NotFoundException(`PriceQuote with ID ${id} not found`);
    }
    return updatedPriceQuote;
  }


  async createListProduct(createListProductDto: CreateListProductDto) {
    const priceQuote = await this.priceQuoteRepository.findOne({where:{price_quote_id:createListProductDto.price_quote}})
    const listProduct = this.listProductRepository.create({...createListProductDto,price_quote:priceQuote,PQ_product_id:uuidv4()});
    return await this.listProductRepository.save(listProduct);
  }

  async findOneListProduct(id: string) {
    const listProduct = await this.listProductRepository.findOne({ where: { PQ_product_id: id } });
    if (!listProduct) {
      throw new NotFoundException('ListProduct not found');
    }
    return listProduct;
  }

  async findAllListProduct() {
    return await this.listProductRepository.find();
  }

  async updateListProduct(id: string, updateListProductDto: UpdateListProductDto) {
    return await this.listProductRepository.update(id,updateListProductDto);
  }

  async removeListProduct(id: string) {
    const result = await this.listProductRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('ListProduct not found');
    }
  }
 
 
}
