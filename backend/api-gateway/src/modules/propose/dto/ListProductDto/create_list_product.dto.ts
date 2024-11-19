import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateListProductDto {
  @IsString()
  @IsOptional()
  PQ_product_id: string;

  @IsString()
  @IsNotEmpty()
  propose: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  vat: number;
}
