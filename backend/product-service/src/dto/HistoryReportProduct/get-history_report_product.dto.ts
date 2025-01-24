import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { CodeProduct } from 'src/database/entities/code_product.entity';
import { CommentReportProduct } from 'src/database/entities/comment_report_product.entity';
import { LikeReportProduct } from 'src/database/entities/like_report_product.entity';

export class GetHistoryReportProductDto {
  @IsString()
  @IsOptional()
  history_id: string;

  @IsEnum(['pending', 'analysis', 'progress', 'testing', 'resolve'])
  status: 'pending' | 'analysis' | 'progress' | 'testing' | 'resolve';

  @IsString()
  @IsOptional()
  activity: string;

  @IsString()
  @IsOptional()
  customer: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  user_support: string;

  @IsString()
  @IsOptional()
  code_product: CodeProduct;

  @IsArray()
  @IsOptional()
  comment: CommentReportProduct[];

  @IsArray()
  @IsOptional()
  like: LikeReportProduct[];
}
