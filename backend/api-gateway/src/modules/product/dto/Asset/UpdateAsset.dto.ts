import { Type } from 'class-transformer';
import { IsString,  IsOptional,  IsDateString, IsNumber } from 'class-validator';

export class UpdateAssetDto {

  @IsString()
  @IsOptional()
  asset_code: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  code_product: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  project: string;

  @IsDateString()
  @IsOptional()
  purchase_date?: Date;

  @IsDateString()
  @IsOptional()
  warranty_expiry?: Date;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  serial_number?: string;
}
