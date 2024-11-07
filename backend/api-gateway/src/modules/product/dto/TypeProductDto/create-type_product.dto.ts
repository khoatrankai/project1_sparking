import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTypeProductDto {
  @IsOptional() // The type_product_id is optional
  @IsString()
  type_product_id?: string;

  @IsString()
  @IsNotEmpty() // The name is required
  name: string;
}
