import {  Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create_invoice.dto';
import { UpdateInvoiceDto } from './dto/update_invoice.dto';
import { GetFilterInvoiceDto } from './dto/get_filter_invoice.dto';



@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getHello(): string {
    return this.invoiceService.getHello();
  }

  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.sendCreateInvoice(createInvoiceDto);
  }

  @Put()
  async updateInvoice(@Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.sendUpdateInvoice(updateInvoiceDto);
  }

  @Get('get-filter')
  async getFilterInvoice(@Query() getFilterInvoice: GetFilterInvoiceDto) {
 
    return this.invoiceService.sendGetFilterInvoice(getFilterInvoice);
  }
  
}
