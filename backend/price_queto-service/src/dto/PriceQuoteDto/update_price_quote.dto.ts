import { IsString, IsEnum, IsInt, IsOptional, IsDateString } from 'class-validator';

export class UpdatePriceQuoteDto {
  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsDateString()
  date_start?: Date;

  @IsOptional()
  @IsDateString()
  date_expired?: Date;

  @IsOptional()
  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  status?: string;

  @IsOptional()
  @IsEnum(['vnd', 'usd'])
  type_money?: string;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsInt()
  vat?: number;

  @IsOptional()
  @IsString()
  reference_code?: string;

  @IsOptional()
  @IsString()
  user_support?: string;

  @IsOptional()
  @IsEnum(['none', 'before', 'after'])
  type_discount?: string;

  @IsOptional()
  @IsString()
  description?: string;


}
