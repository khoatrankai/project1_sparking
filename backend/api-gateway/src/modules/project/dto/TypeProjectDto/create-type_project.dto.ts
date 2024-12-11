import { IsString, IsOptional } from 'class-validator';

export class CreateTypeProjectDto {
  @IsOptional() // The type_product_id is optional
  @IsString()
  type_id?: string;

  @IsString()
  name_type: string;
}
