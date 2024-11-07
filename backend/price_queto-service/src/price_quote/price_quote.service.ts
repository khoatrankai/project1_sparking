import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriceQuoteDto } from 'src/dto/create_price_quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceQuote } from 'src/database/entities/price_queto.entity';
import { v4 as uuidv4 } from 'uuid';

import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UpdatePriceQuoteDto } from 'src/dto/update_price_quote.dto';
import { GetFilterPriceQuoteDto } from 'src/dto/get_filter_price_quote.dto';


@Injectable()
export class PriceQuoteService {

  constructor(@InjectRepository(PriceQuote) private readonly priceQuoteRepository:Repository<PriceQuote>){}
  getHello(): string {
    return 'Hello World!';
  }
  async createPriceQuote(createPriceQuote: CreatePriceQuoteDto) {
    try {
      const id = uuidv4();
      const newPriceQuote = this.priceQuoteRepository.create({
        ...createPriceQuote,
        price_quote_id: id,
      });
      await this.priceQuoteRepository.save(newPriceQuote);

      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updatePriceQuote(updatePriceQuote: UpdatePriceQuoteDto) {
    try {
      await this.priceQuoteRepository.update(
        updatePriceQuote.price_quote_id,
        updatePriceQuote,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getFilterPriceQuote(getFilterPriceQuote: GetFilterPriceQuoteDto) {
    const type_date = Number(getFilterPriceQuote.type_date) ?? null;
    const date_start = getFilterPriceQuote.date_start ? new Date(getFilterPriceQuote.date_start) : null;
    const date_expired = getFilterPriceQuote.date_expired ? new Date(getFilterPriceQuote.date_expired) : null;
    const status = getFilterPriceQuote.status ?? null;
    const staff_support = getFilterPriceQuote.staff_support ?? null;
  
    const whereCondition: any = {};
  
    // Lọc theo staff_support
    if (staff_support) {
      whereCondition.staff_support = staff_support;
    }
  
    // Lọc theo khoảng thời gian (date_start và date_expired)
    if (date_start || date_expired) {
      if (!type_date) {
        if (date_start && date_expired) {
          whereCondition.date_start = Between(date_start, date_expired);
        } else {
          if (date_start) {
            whereCondition.date_start = MoreThanOrEqual(date_start);
          }
          if (date_expired) {
            whereCondition.date_start = LessThanOrEqual(date_expired);
          }
        }
      } else {
        if (date_start && date_expired) {
          whereCondition.date_expired = Between(date_start, date_expired);
        } else {
          if (date_start) {
            whereCondition.date_expired = MoreThanOrEqual(date_start);
          }
          if (date_expired) {
            whereCondition.date_expired = LessThanOrEqual(date_expired);
          }
        }
      }
    }
  
    // Lọc theo status
    if (status) {
      whereCondition.status = status;
    }
  
    // Lấy dữ liệu từ repository dựa trên điều kiện whereCondition
    const result = await this.priceQuoteRepository.find({
      where: whereCondition,
    });
  
    return result;
  }
 
}
