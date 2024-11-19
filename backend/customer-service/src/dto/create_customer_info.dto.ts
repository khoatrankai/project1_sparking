import { IsString, Length, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateCustomerInfoDto {

  @IsString()
  @Length(1, 50)
  name_company: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  group_customer?: string;

  @IsString()
  @Length(1, 50)
  tax_code: string;

  @IsString()
  @Length(1, 50)
  province: string;

  @IsString()
  @Length(1, 12)
  phone_number: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  website?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  opportunity?: string;

  @IsEnum(['vnd', 'usd'])
  type_money: string;
  
  @IsDateString()
  @IsOptional()
  date_establish: Date;

  @IsString()
  @Length(1, 50)
  address_payment: string;

  @IsString()
  @Length(1, 50)
  address_delivery: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  province_payment?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  province_delivery?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  staff_support?: string;
}