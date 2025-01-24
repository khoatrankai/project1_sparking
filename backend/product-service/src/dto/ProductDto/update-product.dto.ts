import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  MaxLength,
  IsArray,
} from 'class-validator';
import { CreateListDetailDto } from '../ListDetail/create-list_detail.dto';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  code_original?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  warranty?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  vat?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  brand?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  original?: string;

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

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsOptional()
  details?: CreateListDetailDto[];
}
