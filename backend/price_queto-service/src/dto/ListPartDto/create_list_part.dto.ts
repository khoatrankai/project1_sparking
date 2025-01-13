import { IsString, IsOptional, IsArray } from 'class-validator';
import { CreateListProductDto } from '../ListProductDto/create_list_product.dto';

export class CreateListPartDto {
  @IsString()
  @IsOptional()
  part_id: string;

  @IsString()
  @IsOptional()
  price_quote: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  type_package: string;

  @IsOptional()
  @IsArray()
  products?: CreateListProductDto[];

}
