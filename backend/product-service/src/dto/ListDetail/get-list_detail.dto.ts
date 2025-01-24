import { IsString, IsOptional, IsDate } from 'class-validator';
import { GetProductDto } from '../ProductDto/get-product.dto';

export class GetListDetailDto {
  @IsString()
  @IsOptional()
  detail_id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  product: GetProductDto;
}
