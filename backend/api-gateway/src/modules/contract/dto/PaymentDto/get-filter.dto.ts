import { IsString, IsOptional } from 'class-validator';

export class GetFilterPaymentDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  date_start?: string;

  @IsString()
  @IsOptional()
  date_end?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  supplier?: string;

  @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsString()
  @IsOptional()
  customer?: string;
}
