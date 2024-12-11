import { IsString,  IsInt, Min, IsOptional } from 'class-validator';

export class CreateListDetailProductDto {
  @IsString()
  @IsOptional()
  detail_id: string;

  @IsString()
  @IsOptional()
  PQ_product: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  unit: string;


}
