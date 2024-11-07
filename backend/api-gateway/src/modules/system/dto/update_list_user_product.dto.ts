import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateListUseProductDto {

  @IsString()
  use_id: string;

  @IsEnum(['ĐX', 'BG', 'HĐ'])
  @IsOptional()
  type_use?: string;

  @IsString()
  @IsOptional()
  type_use_id?: string;

  @IsString()
  @IsOptional()
  product?: string;

  @IsInt()
  @IsOptional()
  quantity?: number;
}
