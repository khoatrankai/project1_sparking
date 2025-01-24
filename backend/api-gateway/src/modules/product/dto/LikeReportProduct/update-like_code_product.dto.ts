import { IsString, IsOptional } from 'class-validator';

export class UpdateLikeReportProductDto {
  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  user_support: string;

  @IsString()
  @IsOptional()
  history_report: string;
}
