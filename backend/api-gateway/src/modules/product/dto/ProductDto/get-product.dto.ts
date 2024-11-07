import { IsString, IsNumber, IsEnum } from 'class-validator';

export class GetProductDto {
  @IsString()
  product_id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  vat: number;

  @IsNumber()
  quantity: number;

  @IsString()
  unit_product: string;

  @IsEnum(['active', 'delete', 'hide'])
  status: 'active' | 'delete' | 'hide';
}
