import { IsOptional, IsString, IsEnum, IsInt, IsDate, IsEmail } from 'class-validator';

export class GetOpportunitiesDto {
  @IsOptional()
  @IsString()
  opportunity_id?: string;

  @IsOptional()
  @IsString()
  type_opportunity?: string;

  @IsOptional()
  @IsString()
  type_source?: string;

  @IsOptional()
  @IsString()
  user_support?: string;

  @IsOptional()
  @IsString()
  list_label?: string;

  @IsOptional()
  @IsString()
  name_contact?: string;

  @IsOptional()
  @IsEnum(['active', 'delete', 'hide'])
  status?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  province_id?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  latch_date?: Date;
}
