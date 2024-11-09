import { IsString, IsEnum, IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreatePriceQuoteDto {
  @IsString()
  @IsOptional()
  price_quote_id: string;

  @IsString()
  customer: string;

  @IsDateString()
  date_start: Date;

  @IsDateString()
  date_expired: Date;

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  status: string;

  @IsEnum(['vnd', 'usd'])
  type_money: string;

  @IsInt()
  price: number;

  @IsInt()
  vat: number;

  @IsString()
  reference_code: string;

  @IsOptional()
  @IsString()
  user_support?: string;

  @IsEnum(['none', 'before', 'after'])
  type_discount: string;

  @IsOptional()
  @IsString()
  description?: string;

}
