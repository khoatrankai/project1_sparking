import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export class UpdateActivityContainerDto {
  @IsEnum(['import', 'export', 'status'])
  @IsOptional()
  type?: 'import' | 'export' | 'status';

  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  customer?: string;

  @IsString()
  @IsOptional()
  activity?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  list_code?: {
    price: number;
    code: string;
    status:
      | 'selled'
      | 'borrowed'
      | 'inventory'
      | 'warranty'
      | 'maintenance'
      | 'export';
    date_expired?: Date;
  }[];

  @IsArray()
  @IsOptional()
  list_product?: { quantity: number; product: string; price: number }[];
}
