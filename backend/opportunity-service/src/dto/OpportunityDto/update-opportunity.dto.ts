import {
  IsString,
  IsEnum,
  IsInt,
  IsDate,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class UpdateOpportunitiesDto {
  @IsString()
  @IsOptional()
  type_opportunity: string;

  @IsString()
  @IsOptional()
  type_source: string;

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
  @IsEnum(['delete', 'hide', 'success', 'pending', 'cancel'])
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
