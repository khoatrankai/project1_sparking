import { IsString, IsNotEmpty, IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  name_product: string;

  @IsEnum(['TB', 'VT'])
  @IsOptional()
  type?: string;

  @IsInt()
  price_product: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  vat: number;

  @IsString()
  @IsOptional()
  unit_product: string;

  @IsEnum(['active', 'delete', 'hide'])
  @IsOptional()
  status?: string;

}