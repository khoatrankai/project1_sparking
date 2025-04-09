import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';
export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  review_id: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsDate()
  time_end: Date;

  @IsOptional()
    @IsNumber()
    progress: number;
  
    @IsOptional()
    @IsString()
    quality: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
