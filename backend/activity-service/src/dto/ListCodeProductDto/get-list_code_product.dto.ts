import { IsString,   IsOptional, IsNotEmpty } from 'class-validator';

export class GetListCodeProductDto {
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