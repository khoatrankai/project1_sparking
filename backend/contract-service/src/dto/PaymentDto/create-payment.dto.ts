// create-payment.dto.ts
import { IsString, IsEnum, IsNumber, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {

  @IsString()
  @IsOptional()
  payment_id:string

  @IsString()
  @IsNotEmpty()
  contract: string;

  @IsEnum(['pending', 'success'])
  status: string;

  @IsEnum(['default', 'time'])
  type: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  times?: number;

  @IsDate()
  @Type(() => Date)
  date_expired: Date;
}
