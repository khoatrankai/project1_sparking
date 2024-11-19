import { IsString, IsEnum, IsInt, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  payment_id: string;

  @IsString()
  contract: string; // hoặc là ID của `Contract`

  @IsEnum(['pending', 'fail', 'success'])
  status: string;

  @IsInt()
  price: number;

  @IsDate()
  @Type(() => Date)
  date_expired: Date;

  @IsString()
  type_method: string; // hoặc là ID của `TypeMethod`
}
