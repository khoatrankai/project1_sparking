import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {

  @IsString()
  name_product: string;

  @IsEnum(['main', 'accessory'])
  type: string;

  @IsString()
  @IsOptional()
  main_id?: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;

  @IsInt()
  vat: number;

  @IsString()
  @IsOptional()
  type_product: string;

  @IsEnum(['active', 'delete', 'hide'])
  status: string;
}