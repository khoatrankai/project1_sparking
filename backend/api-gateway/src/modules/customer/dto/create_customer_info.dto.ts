import {
  IsString,
  Length,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';

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

  @IsString()
  @Length(1, 12)
  phone_number: string;

  @IsOptional()
  @IsString()
  picture_url?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsEnum(['vnd', 'usd'])
  type_money: string = 'vnd';

  @IsDateString()
  @IsOptional()
  date_establish?: Date;

  @IsString()
  @IsOptional()
  opportunity?: string;

  @IsString()
  @IsOptional()
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
