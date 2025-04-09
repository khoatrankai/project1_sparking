import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class GetReviewDto {
  @IsString()
  review_id: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  progress: number;
  
    @IsOptional()
    @IsString()
    quality: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  time_end: Date;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  user_create?: string;
}
