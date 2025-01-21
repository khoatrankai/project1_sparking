import { Type } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export class GetFilterPaymentDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  date_start?: string;

  @IsString()
  @IsOptional()
  date_end?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  supplier?: string;

  @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsString()
  @IsOptional()
  customer?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  export?: boolean;

  @IsOptional()
  @IsEnum(['month', 'quarter', 'year'])
  typeDate?: 'month' | 'quarter' | 'year';
}
