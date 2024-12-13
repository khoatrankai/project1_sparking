import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTypeProductDto {
  @IsOptional() // The type_product_id is optional
  @IsString()
  type_product_id?: string;

  @IsString()
  @IsNotEmpty() 
  name: string;

  @IsString()
  @IsOptional() 
  name_tag: string;

  @IsString()
  @IsOptional() 
  description: string;

  @IsString()
  @IsOptional() 
  classify_type: string;
}
