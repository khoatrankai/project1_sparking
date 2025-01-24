import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateHistoryCodeProductDto {
  @IsEnum(['selled', 'borrowed', 'inventory', 'export'])
  @IsOptional()
  status?: 'selled' | 'borrowed' | 'inventory' | 'export';

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  vat?: string; // Default: 0

  @IsString()
  @IsOptional()
  profit?: string; // Default: 0

  @IsString()
  @IsOptional()
  code_product?: string; // ID of CodeProduct

  @IsString()
  @IsOptional()
  activity_container?: string; // ID of ActivityContainer
}
