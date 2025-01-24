import { IsString, IsOptional } from 'class-validator';

export class CreateCommentReportProductDto {
  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  user_support: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  history_report: string;
}
