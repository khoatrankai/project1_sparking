import {
  IsString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateHistoryCodeProductDto {
  @IsString()
  @IsNotEmpty()
  history_id: string;

  @IsEnum([
    'selled',
    'borrowed',
    'inventory',
    'export',
    'warranty',
    'maintenance',
  ])
  @IsOptional()
  status?:
    | 'selled'
    | 'borrowed'
    | 'inventory'
    | 'export'
    | 'maintenance'
    | 'warranty';

  @IsInt()
  @IsOptional()
  price?: number; // Default: 0

  @IsString()
  @IsOptional()
  vat?: string; // Default: 0

  @IsString()
  @IsOptional()
  profit?: string; // Default: 0

  @IsString()
  @IsNotEmpty()
  code_product: string; // ID of CodeProduct

  @IsString()
  @IsNotEmpty()
  activity_container: string; // ID of ActivityContainer
}
