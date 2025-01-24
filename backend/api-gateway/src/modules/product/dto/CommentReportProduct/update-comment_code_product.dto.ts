import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentReportProductDto {
  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  user_support: string;

  @IsString()
  @IsOptional()
  description: string;
}
