import { IsString, IsEnum, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCodeProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  code_product_id: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  code: string;

  @IsEnum(['selled', 'borrowed', 'inventory', 'export'])
  @IsOptional()
  status?: 'selled' | 'borrowed' | 'inventory' | 'export';

  @IsString()
  @IsNotEmpty()
  product: string;

}
