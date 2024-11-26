import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePriceQuoteDto } from './dto/PriceQuoteDto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from './dto/PriceQuoteDto/update_price_quote.dto';
import { PriceQuoteFilterDto } from './dto/PriceQuoteDto/get_filter_price_quote.dto';


@Injectable()
export class PriceQuoteService {

  constructor(@Inject('PRICEQUOTE') private readonly priceQuoteClient:ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async sendCreatePriceQueto(createPriceQuoteDto: CreatePriceQuoteDto) {
    return this.priceQuoteClient.send({ cmd: 'create-price_quote' }, createPriceQuoteDto)
  }

  async sendUpdatePriceQueto(id:string,updatePriceQuetoDto: UpdatePriceQuoteDto) {
    return this.priceQuoteClient.send({ cmd: 'update-price_quote' }, {id,data:updatePriceQuetoDto})
  }

  async sendGetPriceQueto(filter?:PriceQuoteFilterDto) {
    return this.priceQuoteClient.send({ cmd: 'find-all_price_quotes' }, filter?? {})
  }
  async sendGetPriceQuetoID(id:string) {
    return this.priceQuoteClient.send({ cmd: 'find-one_price_quote' }, id)
  }
  // async sendGetFilterPriceQuote(getFilterPriceQuote: GetPriceQuoteDto) {
  //   return this.priceQuoteClient.send('get-filter_price_quote', getFilterPriceQuote)
  // }

 
}
