import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { StatusAsset } from 'src/database/entities/asset.entity';

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

  @IsEnum(StatusAsset)
  @IsOptional()
  status?: StatusAsset;

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

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  serial_number?: string;
}
