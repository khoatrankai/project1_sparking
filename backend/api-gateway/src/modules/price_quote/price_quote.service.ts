import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePriceQuoteDto } from './dto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from './dto/update_price_quote.dto';
import { GetFilterPriceQuoteDto } from './dto/get_filter_price_quote.dto';


@Injectable()
export class PriceQuoteService {

  constructor(@Inject('PRICEQUOTE') private readonly priceQuoteClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreatePriceQueto(createPriceQuoteDto: CreatePriceQuoteDto) {
    return this.priceQuoteClient.send('create-price_quote', createPriceQuoteDto)
  }

  async sendUpdatePriceQueto(updatePriceQuetoDto: UpdatePriceQuoteDto) {
    return this.priceQuoteClient.send('update-price_quote', updatePriceQuetoDto)
  }
  async sendGetFilterPriceQuote(getFilterPriceQuote: GetFilterPriceQuoteDto) {
    return this.priceQuoteClient.send('get-filter_price_quote', getFilterPriceQuote)
  }

 
}
