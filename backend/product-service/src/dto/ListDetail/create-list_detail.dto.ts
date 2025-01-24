import { IsString, IsOptional } from 'class-validator';
import { Products } from 'src/database/entities/product.entity';

export class CreateListDetailDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  product: Products;
}
