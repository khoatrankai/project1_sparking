import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateListCodeProductDto {
  @IsString()
  @IsOptional()
  list_id: string;

  @IsString()
  @IsNotEmpty()
  code_product: string;

  @IsString()
  @IsNotEmpty()
  activity: string;
}