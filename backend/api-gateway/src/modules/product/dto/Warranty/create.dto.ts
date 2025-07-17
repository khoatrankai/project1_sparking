import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateWarrantyDto {
  @IsDateString()
  date_start: Date;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  review?: string;

  @IsOptional()
  @IsString()
  solve?: string;

  @IsOptional()
  @IsDateString()
  date_end?: Date;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  activity?: string;

  @IsString()
  asset: string;
}
