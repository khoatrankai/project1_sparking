import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/database/entities/invoice.entity';
import { CreateInvoiceDto } from 'src/dto/create_invoice.dto';
import { GetFilterInvoiceDto } from 'src/dto/get_filter_invoice.dto';
import { UpdateInvoiceDto } from 'src/dto/update_invoice.dto';

import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class InvoiceService {

  constructor(@InjectRepository(Invoice) private readonly invoiceRepository:Repository<Invoice>){}
  getHello(): string {
    return 'Hello World!';
  }

  async createInvoice(createInvoice: CreateInvoiceDto) {
    try {
      const id = uuidv4();
      const dataNew = this.invoiceRepository.create({
        ...createInvoice,
        invoice_id: id,
      });
      await this.invoiceRepository.save(dataNew);
  
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updateInvoice(updateInvoice: UpdateInvoiceDto) {
    try {
      await this.invoiceRepository.update(
        updateInvoice.invoice_id,
        updateInvoice,
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

  async getFilterInvoice(getFilterInvoice: GetFilterInvoiceDto) {
    const type_date = Number(getFilterInvoice.type_date) ?? null;
    const date_start = getFilterInvoice.date_start ? new Date(getFilterInvoice.date_start) : null;
    const date_expired = getFilterInvoice.date_expired ? new Date(getFilterInvoice.date_expired) : null;
    const status = getFilterInvoice.status ?? null;
    const staff_support = getFilterInvoice.staff_support ?? null;
  
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
    const result = await this.invoiceRepository.find({
      where: whereCondition,
    });
  
    return result;
  }
  
  
 
}
