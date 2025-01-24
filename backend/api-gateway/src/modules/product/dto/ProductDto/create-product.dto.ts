import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsJSON,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional() // The product_id is optional
  @IsString()
  product_id?: string;

  @IsString()
  @IsNotEmpty() // The name is required
  name: string;

  @IsString()
  @IsNotEmpty() // The type should not be empty
  type: string;

  @IsString()
  @IsOptional()
  code_original?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional() // The price is required
  price?: number = 0;

  @IsString()
  @IsNotEmpty() // The description is required
  description: string;

  @IsString()
  @IsNotEmpty() // The VAT is required
  vat: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  original: string;

  @IsString()
  @IsNotEmpty() // The VAT is required
  profit: string;

  @IsOptional() // The quantity is optional
  @IsNumber()
  quantity?: number;

  @IsString()
  @IsNotEmpty() // The unit_product should not be empty
  unit_product: string;

  @IsOptional() // The status is optional
  @IsEnum(['active', 'delete', 'hide']) // The status can only be one of these values
  status?: 'active' | 'delete' | 'hide';

  @IsString()
  @IsOptional()
  supplier_product: string;

  @IsJSON()
  @IsOptional()
  details?: JSON;
}
