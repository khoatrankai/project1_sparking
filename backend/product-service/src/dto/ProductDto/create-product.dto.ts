import {
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  IsUUID,
  IsArray,
} from 'class-validator';
import { CreateListDetailDto } from '../ListDetail/create-list_detail.dto';

export class CreateProductDto {
  @IsUUID()
  product_id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  code_original: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  warranty: number;

  @IsString()
  description: string;

  @IsString()
  vat: string;

  @IsString()
  brand: string;

  @IsString()
  original: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsString()
  unit_product: string;

  @IsOptional()
  @IsIn(['active', 'delete', 'hide'])
  status?: 'active' | 'delete' | 'hide';

  @IsString()
  @IsOptional()
  supplier_product: string;

  @IsArray()
  @IsOptional()
  details?: CreateListDetailDto[];
}
