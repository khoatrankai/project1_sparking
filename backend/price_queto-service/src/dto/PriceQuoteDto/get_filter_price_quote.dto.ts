import { IsString, IsEnum, IsInt, IsDateString } from 'class-validator';

export class GetPriceQuoteDto {
  @IsString()
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

  @IsString()
  user_support?: string;

  @IsEnum(['none', 'before', 'after'])
  type_discount: string;

  @IsString()
  description: string;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}
