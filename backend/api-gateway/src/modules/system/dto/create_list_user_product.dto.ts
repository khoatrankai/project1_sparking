import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateListUseProductDto {

  @IsEnum(['ĐX', 'BG', 'HĐ'])
  type_use: string;

  @IsString()
  @IsOptional()
  type_use_id?: string;

  @IsString()
  product: string;

  @IsInt()
  quantity: number;
}
