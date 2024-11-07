import { IsString, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';

export class UpdatePriceQuoteDto {
  @IsString()
  price_quote_id: string;

  @IsString()
  @IsOptional()
  customer?: string;

  @IsDateString()
  @IsOptional()
  date_start?: Date;

  @IsDateString()
  @IsOptional()
  date_expired?: Date;

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  @IsOptional()
  status?: string;

  @IsEnum(['vnd', 'usd'])
  @IsOptional()
  type_money?: string;

  @IsInt()
  price?:number

  @IsInt()
  vat?:number

  @IsString()
  @IsOptional()
  reference_code?: string;

  @IsString()
  @IsOptional()
  staff_support?: string;

  @IsEnum(['none', 'before', 'after'])
  @IsOptional()
  type_discount?: string;

  @IsString()
  @IsOptional()
  description?: string;
}