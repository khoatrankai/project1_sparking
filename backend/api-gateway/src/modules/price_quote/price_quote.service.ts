import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePriceQuoteDto } from './dto/PriceQuoteDto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from './dto/PriceQuoteDto/update_price_quote.dto';
import { PriceQuoteFilterDto } from './dto/PriceQuoteDto/get_filter_price_quote.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateTypePackageDto } from './dto/TypePackageDto/update_type_package.dto';
import { CreateTypePackageDto } from './dto/TypePackageDto/create_type_package.dto';
// import { IGetPriceQuote } from './dto/PriceQuoteDto/get-price_quote.dto';

@Injectable()
export class PriceQuoteService {
  constructor(
    @Inject('PRICEQUOTE') private readonly priceQuoteClient: ClientProxy,
  ) {}
  getHello() {
    return this.priceQuoteClient.send(
      { cmd: 'get-full_revenue_name' },
      'Camera',
    );
  }

  async sendFindFullTypePackageYear() {
    return this.priceQuoteClient.send(
      { cmd: 'find-full_type_package_year' },
      {},
    );
  }

  async sendGetFullRevenueByName(name: string) {
    return this.priceQuoteClient.send({ cmd: 'get-full_revenue_name' }, name);
  }

  async sendCreatePriceQueto(createPriceQuoteDto: CreatePriceQuoteDto) {
    return this.priceQuoteClient.send(
      { cmd: 'create-price_quote' },
      createPriceQuoteDto,
    );
  }

  async sendDeletePriceQueto(datas: string[]) {
    return await firstValueFrom(
      this.priceQuoteClient.send({cmd:'delete-price_quote'}, datas),
    );
  }

  async sendUpdatePriceQueto(
    id: string,
    updatePriceQuetoDto: UpdatePriceQuoteDto,
  ) {
    return this.priceQuoteClient.send(
      { cmd: 'update-price_quote' },
      { id, data: updatePriceQuetoDto },
    );
  }

  async sendUpdateStatusPriceQueto(
    updatePriceQuetoDto: { price_quote_id: string; status: string }[],
  ) {
    return this.priceQuoteClient.send(
      { cmd: 'update-status_price_quote' },
      updatePriceQuetoDto,
    );
  }

  async sendGetPriceQueto(filter?: PriceQuoteFilterDto) {
    return this.priceQuoteClient.send(
      { cmd: 'find-all_price_quotes' },
      filter ?? {},
    );
  }

  async sendGetPriceQuetoByToken(customer_id: string) {
    return this.priceQuoteClient.send(
      { cmd: 'find-all_price_quotes_by_token' },
      customer_id,
    );
  }
  async sendGetPriceQuetoID(id: string) {
    return this.priceQuoteClient.send({ cmd: 'find-one_price_quote' }, id);
  }

  async sendGetFullPriceQuetoID(id: string) {
    return firstValueFrom(
      this.priceQuoteClient.send({ cmd: 'find-one_full_price_quote' }, id),
    );
  }

  async exportExcelPriceQuote(id: string) {
    const data = await this.sendGetFullPriceQuetoID(id);
    // await this.createExcelPriceQuote(data.data)
    return data;
  }

  async createTypePackage(createTypePackageDto: CreateTypePackageDto) {
    try {
      const result = await firstValueFrom(
        this.priceQuoteClient.send(
          { cmd: 'create-type_package' },
          { ...createTypePackageDto },
        ),
      );
      return result;
    } catch{
      throw new HttpException(
        'Failed to create type product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendDeleteTypePackage(datas: string[]) {
    return await firstValueFrom(
      this.priceQuoteClient.send({cmd:'delete-type_package'}, datas),
    );
  }

  async findAllTypePackage() {
    try {
      const result = await firstValueFrom(
        this.priceQuoteClient.send({ cmd: 'find-all_type_package' }, {}),
      );
      return result;
    } catch {
      throw new HttpException(
        'Failed to fetch type products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneTypePackage(id: string) {
    try {
      const result = await firstValueFrom(
        this.priceQuoteClient.send({ cmd: 'find-one_type_package' }, id),
      );
      if (!result)
        throw new HttpException('TypePackage not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTypePackage(
    id: string,
    updateTypePackageDto: UpdateTypePackageDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.priceQuoteClient.send(
          { cmd: 'update-type_package' },
          { id, updateTypePackageDto },
        ),
      );
      if (!result)
        throw new HttpException('Type product not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getPriceQuotesByOpportunities(ids: string[]) {
    try {
      const result = await firstValueFrom(
        this.priceQuoteClient.send({ cmd: 'get-price_quote-opportunities' }, ids),
      );
      if (!result)
        throw new HttpException('TypePackage not found', HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // async sendGetFilterPriceQuote(getFilterPriceQuote: GetPriceQuoteDto) {
  //   return this.priceQuoteClient.send('get-filter_price_quote', getFilterPriceQuote)
  // }
}
