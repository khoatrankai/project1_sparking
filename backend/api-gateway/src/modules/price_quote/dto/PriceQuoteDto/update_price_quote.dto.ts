import { IsString, IsEnum, IsInt, IsOptional, IsDateString, IsArray } from 'class-validator';
import { CreateListPartDto } from '../ListPartDto/create_list_part.dto';

export class UpdatePriceQuoteDto {
  @IsOptional()
  @IsString()
  project?: string;

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
  @IsString()
  reference_code?: string;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  opportunity?: string;


  @IsOptional()
  @IsString()
  user_support?: string;

  @IsOptional()
  @IsEnum(['none', 'before', 'after'])
  type_vat?: string;

  @IsOptional()
  @IsEnum(['percent', 'money'])
  type_discount: string;

  @IsInt()
  @IsOptional()
  discount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  parts?: CreateListPartDto[];
}
