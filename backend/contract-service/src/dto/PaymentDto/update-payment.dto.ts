// update-payment.dto.ts
import { IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(['pending', 'success'])
  status?: string;

  @IsOptional()
  @IsEnum(['default', 'time'])
  type?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  times?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_expired?: Date;
}
