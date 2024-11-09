// update-method-payment.dto.ts
import { IsEnum, IsNumber, IsOptional, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMethodPaymentDto {
  @IsOptional()
  @IsEnum(['pending', 'fail', 'success'])
  status?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  time?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_expired?: Date;

  @IsOptional()
  @IsString()
  type_method?: string;
}
