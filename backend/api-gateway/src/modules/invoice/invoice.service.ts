import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateInvoiceDto } from './dto/create_invoice.dto';
import { UpdateInvoiceDto } from './dto/update_invoice.dto';
import { GetFilterInvoiceDto } from './dto/get_filter_invoice.dto';

@Injectable()
export class InvoiceService {

  constructor(@Inject('INVOICE') private readonly invoiceClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreateInvoice(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceClient.send('create-invoice', createInvoiceDto)
  }

  async sendUpdateInvoice(updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceClient.send('update-invoice', updateInvoiceDto)
  }

  async sendGetFilterInvoice(getFilterInvoice: GetFilterInvoiceDto) {
    return this.invoiceClient.send('get-filter_invoice', getFilterInvoice)
  }
 
}
