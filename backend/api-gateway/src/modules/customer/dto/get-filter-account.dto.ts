import { IsString, IsOptional } from 'class-validator';

export class GetFilterAccountCustomersDto {
  @IsString()
  @IsOptional()
  customer_info?: string;
}
