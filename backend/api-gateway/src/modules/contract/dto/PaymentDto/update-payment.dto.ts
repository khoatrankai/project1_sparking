import { IsString, IsEnum, IsInt, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto {
  @IsString()
  @IsOptional()
  payment_id?: string;

  @IsString()
  @IsOptional()
  contract?: string; // hoặc là ID của `Contract`

  @IsEnum(['pending', 'fail', 'success'])
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  type_product: string;

  @IsString()
  @IsOptional()
  supplier: string;

  @IsEnum(['import','export'])
  @IsOptional()
  type: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_expired?: Date;

  @IsString()
  @IsOptional()
  type_method?: string; // hoặc là ID của `TypeMethod`
}
