import { IsString, IsEnum, IsInt, IsOptional, IsDateString, IsArray } from 'class-validator';
import { CreateListProductDto } from '../ListProductDto/create_list_product.dto';

export class CreatePriceQuoteDto {
  @IsString()
  @IsOptional()
  price_quote_id: string;

  @IsString()
  project: string;

  @IsDateString()
  date_start: Date;

  @IsDateString()
  date_expired: Date;

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  status: string;

  @IsEnum(['vnd', 'usd'])
  type_money: string;

  @IsInt()
  @IsOptional()
  discount: number;

  @IsString()
  reference_code: string;

  @IsOptional()
  @IsString()
  user_support?: string;

  @IsEnum(['none', 'before', 'after'])
  type_vat: string;

  @IsEnum(['percent', 'money'])
  @IsOptional()
  type_discount: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  products?: CreateListProductDto[];

}
