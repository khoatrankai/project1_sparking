import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class GetFilterPriceQuoteDto {
  @IsDateString()
  @IsOptional()
  date_start?: string;

  @IsDateString()
  @IsOptional()
  date_expired?: string;

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  staff_support?: string;

  @IsOptional()
  type_date?: number;
}