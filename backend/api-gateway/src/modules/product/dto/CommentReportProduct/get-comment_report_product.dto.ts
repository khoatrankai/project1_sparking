import { IsString, IsOptional, IsDate } from 'class-validator';
import { GetHistoryReportProductDto } from '../HistoryReportProduct/get-history_report_product.dto';

export class GetCommentReportProductDto {
  @IsString()
  @IsOptional()
  comment_id: string;

  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  user_support: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsOptional()
  history_report: GetHistoryReportProductDto;
}
