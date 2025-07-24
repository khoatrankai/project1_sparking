import { IsString, Length, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateCustomerInfoDto {

  @IsString()
  name_company: string;

  @IsString()
  @IsOptional()
  group_customer?: string;

  @IsString()
  tax_code: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  picture_url?: string;

  @IsString()
  phone_number: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  opportunity?: string;

  @IsEnum(['vnd', 'usd'])
  type_money: string;
  
  @IsDateString()
  @IsOptional()
  date_establish: Date;

  @IsString()
  address_payment: string;

  @IsString()
  address_delivery: string;

  @IsString()
  @IsOptional()
  province_payment?: string;

  @IsString()
  @IsOptional()
  province_delivery?: string;

  @IsString()
  @IsOptional()
  staff_support?: string;
}