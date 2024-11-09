// create-method-payment.dto.ts
import { IsString, IsEnum, IsNumber, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMethodPaymentDto {
    @IsString()
    @IsOptional()
    method_payment_id:string

  @IsString()
  @IsNotEmpty()
  payment: string;

  @IsEnum(['pending', 'fail', 'success'])
  status: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  time?: number;

  @IsDate()
  @Type(() => Date)
  date_expired: Date;

  @IsString()
  @IsNotEmpty()
  type_method: string;
}
