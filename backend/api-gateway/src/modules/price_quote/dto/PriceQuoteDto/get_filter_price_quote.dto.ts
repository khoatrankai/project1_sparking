import { IsOptional, IsString, IsDateString } from 'class-validator';

export class PriceQuoteFilterDto {
  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  type_date?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  date_start?: string;

  @IsOptional()
  @IsDateString()
  date_expired?: string;

  @IsOptional()
  @IsString()
  user_support?: string;
}
