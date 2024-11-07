import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class GetFilterInvoiceDto {
  @IsDateString()
  @IsOptional()
  date_start?: string;

  @IsDateString()
  @IsOptional()
  date_expired?: string;

  @IsEnum(['payed', 'half', 'waiting'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  staff_support?: string;

  @IsOptional()
  type_date?: number;
}