import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { GetLikeReportProductDto } from '../LikeReportProduct/get-like_report_product.dto';
import { GetCommentReportProductDto } from '../CommentReportProduct/get-comment_report_product.dto';
import { GetCodeProductDto } from '../CodeProductDto/get-code_product.dto';

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
  code_product: GetCodeProductDto;

  @IsArray()
  @IsOptional()
  comment: GetCommentReportProductDto[];

  @IsArray()
  @IsOptional()
  like: GetLikeReportProductDto[];
}
