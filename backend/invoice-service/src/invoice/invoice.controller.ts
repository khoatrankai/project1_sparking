import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { InvoiceService } from './invoice.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateInvoiceDto } from 'src/dto/create_invoice.dto';
import { UpdateInvoiceDto } from 'src/dto/update_invoice.dto';
import { GetFilterInvoiceDto } from 'src/dto/get_filter_invoice.dto';

@Controller()
@UseFilters(ConflictExceptionFilter)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getHello(): string {
    return this.invoiceService.getHello();
  }

  @MessagePattern('create-invoice')
  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceService.createInvoice(createInvoiceDto);
  }

  @MessagePattern('update-invoice')
  async updateInvoice(updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceService.updateInvoice(updateInvoiceDto);
  }

  @MessagePattern('get-filter_invoice')
  async getFilterInvoice(getFilterInvoice: GetFilterInvoiceDto) {
    return await this.invoiceService.getFilterInvoice(getFilterInvoice);
  }
  
}
