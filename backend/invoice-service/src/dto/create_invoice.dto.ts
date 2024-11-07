import { IsString, IsEnum, IsOptional, IsInt, IsDateString, Length } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  @Length(1, 50)
  customer: string;

  @IsDateString()
  @IsOptional()
  date_start?: Date;

  @IsDateString()
  @IsOptional()
  date_expired?: Date;

  @IsString()
  @Length(1, 50)
  method_payment: string;

  @IsEnum(['payed', 'half', 'waiting'])
  @IsOptional()
  status?: 'payed' | 'half' | 'waiting';

  @IsString()
  @Length(1, 50)
  @IsOptional()
  staff_support?: string;

  @IsEnum(['vnd', 'usd'])
  @IsOptional()
  type_money?: 'vnd' | 'usd';

  @IsInt()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  vat?: number;

  @IsInt()
  @IsOptional()
  date_renew?: number;

  @IsEnum(['none', 'before', 'after'])
  @IsOptional()
  type_discount?: 'none' | 'before' | 'after';

  @IsString()
  @IsOptional()
  description?: string;
}