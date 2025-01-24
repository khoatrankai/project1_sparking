import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateHistoryReportProductDto {
  @IsEnum(['pending', 'analysis', 'progress', 'testing', 'resolve'])
  @IsOptional()
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
  code_product: string;
}
