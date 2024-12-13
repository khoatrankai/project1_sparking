import { IsString, IsEnum, IsInt, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  payment_id: string;

  @IsString()
  contract: string; // hoặc là ID của `Contract`

  @IsEnum(['pending', 'fail', 'success'])
  @IsOptional()
  status: string;

  @IsInt()
  price: number;

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
  @Type(() => Date)
  date_expired: Date;

  @IsString()
  type_method: string; // hoặc là ID của `TypeMethod`
}
