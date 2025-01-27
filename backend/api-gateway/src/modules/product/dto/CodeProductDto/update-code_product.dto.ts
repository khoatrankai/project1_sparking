import {
  IsString,
  IsEnum,
  IsOptional,
  MaxLength,
  IsDate,
} from 'class-validator';

export class UpdateCodeProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  code?: string;

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

  @IsDate()
  @IsOptional()
  date_sell?: Date;

  @IsDate()
  @IsOptional()
  date_end_borrow?: Date;

  @IsString()
  @IsOptional()
  product?: string;

  @IsString()
  @IsOptional()
  export?: string;
}
