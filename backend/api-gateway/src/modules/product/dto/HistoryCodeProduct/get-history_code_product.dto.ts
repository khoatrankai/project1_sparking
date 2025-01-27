import { IsString, IsEnum, IsOptional, IsInt } from 'class-validator';
import { GetCodeProductDto } from '../CodeProductDto/get-code_product.dto';
import { GetActivityContainerDto } from '../ActivityContainerDto/get-activity_container.dto';

export class GetHistoryCodeProductDto {
  @IsString()
  @IsOptional()
  history_id?: string;

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

  @IsString()
  @IsOptional()
  code_product?: GetCodeProductDto; // ID of CodeProduct

  @IsString()
  @IsOptional()
  vat?: string; // Default: 0

  @IsString()
  @IsOptional()
  profit?: string; // Default: 0

  @IsString()
  @IsOptional()
  activity_container?: GetActivityContainerDto; // ID of ActivityContainer

  @IsInt()
  @IsOptional()
  price?: number;
}
