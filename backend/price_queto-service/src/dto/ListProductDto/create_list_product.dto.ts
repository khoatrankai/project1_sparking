import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateListProductDto {
  @IsString()
  @IsOptional()
  PQ_product_id: string;

  @IsString()
  @IsOptional()
  part: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  profit: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  vat: string;
}
