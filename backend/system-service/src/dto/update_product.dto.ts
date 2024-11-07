import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  product_id: string;  

  @IsString()
  @IsOptional()
  name_product?: string;

  @IsEnum(['main', 'accessory'])
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  main_id?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  vat?: number;

  @IsString()
  @IsOptional()
  unit_product?: string;

  @IsEnum(['active', 'delete', 'hide'])
  @IsOptional()
  status?: string;
}
