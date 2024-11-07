import { IsString, IsEnum, IsDateString, IsOptional, Length } from 'class-validator';

export class UpdateCustomerInfoDto {
  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  info_id?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  name_company?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  group_customer?: string; // ID của GroupCustomer

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  tax_code?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  province?: string;

  @IsString()
  @Length(1, 12)
  @IsOptional() // Có thể cập nhật hoặc không
  phone_number?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  website?: string;

  @IsEnum(['vnd', 'usd'])
  @IsOptional() // Có thể cập nhật hoặc không
  type_money?: 'vnd' | 'usd';

  @IsDateString()
  @IsOptional() // Có thể cập nhật hoặc không
  date_establish?: Date;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  address_payment?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  address_delivery?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  province_payment?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  province_delivery?: string;

  @IsEnum(['active','inactive'])
  @IsOptional() // Có thể cập nhật hoặc không
  status_active?: string; 

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  staff_support?: string;
}