import { IsString, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreatePriceQuoteDto {
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
  price:number

  @IsInt()
  vat:number

  @IsString()
  reference_code: string;

  @IsString()
  @IsOptional()
  staff_support?: string;

  @IsEnum(['none', 'before', 'after'])
  type_discount: string;

  @IsString()
  @IsOptional()
  description?: string;
}