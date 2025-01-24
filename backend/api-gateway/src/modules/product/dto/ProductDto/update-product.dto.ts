import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsJSON,
} from 'class-validator';
// import { CreateListDetailDto } from '../ListDetail/create-list_detail.dto';

export class UpdateProductDto {
  @Type(() => String)
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string; // Foreign Key ID

  @IsString()
  @IsOptional()
  code_original?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  vat?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  original?: string;

  @IsOptional()
  @IsString()
  profit?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit_product?: string; // Foreign Key ID

  @IsOptional()
  @IsEnum(['active', 'delete', 'hide'])
  status?: 'active' | 'delete' | 'hide';

  @IsString()
  @IsOptional()
  supplier_product?: string;

  @IsJSON()
  @IsOptional()
  details?: JSON;
}
