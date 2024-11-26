import { IsString, IsOptional, IsEnum, IsInt, MaxLength } from 'class-validator';

export class UpdateProductDto {

  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  vat?: string;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  unit_product?: string;

  @IsEnum(['active', 'delete', 'hide'])
  @IsOptional()
  status?: 'active' | 'delete' | 'hide';

  @IsString()
  @IsOptional()
  supplier_product?: string;
}
