import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export class CreateActivityContainerDto {
  @IsString()
  @IsOptional()
  activity_container_id: string;

  @IsEnum(['import', 'export', 'status'])
  type: 'import' | 'export' | 'status';

  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  activity?: string;

  @IsString()
  @IsOptional()
  customer?: string;

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
