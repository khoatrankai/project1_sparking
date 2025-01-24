import { IsString, IsOptional, IsDate } from 'class-validator';
import { HistoryReportProduct } from 'src/database/entities/history_report_product.entity';

export class GetHistoryReportProductDto {
  @IsString()
  @IsOptional()
  like_id: string;

  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  user_support: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsOptional()
  history_report: HistoryReportProduct;
}
