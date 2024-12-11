import { IsString, IsNotEmpty, IsInt, Min, IsOptional, IsArray } from 'class-validator';
import { CreateListDetailProductDto } from '../ListDetailDto/create_list_detail.dto';

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

  @IsArray()
  @IsOptional()
  list_detail:CreateListDetailProductDto[]

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
