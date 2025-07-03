import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional,  IsNumber, IsDate } from 'class-validator';

export class CreateAssetDto {
  // @IsString()
  // @IsOptional()
  // id: string;

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

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsString()
  @IsOptional()
  project: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  purchase_date?: Date;

  @Type(() => Date)
    @IsDate()
    @IsOptional()
  warranty_expiry?: Date;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  serial_number?: string;
}
