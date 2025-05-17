import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { AssetStatus } from 'src/database/entities/asset.entity';

export class GetAssetDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  asset_code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  code_product: string;

  @IsEnum(AssetStatus)
  @IsOptional()
  status?: AssetStatus;

  @IsString()
  @IsNotEmpty()
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
