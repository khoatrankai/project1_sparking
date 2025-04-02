import {
  IsString,
  IsOptional,
  IsNumber,
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
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  user_create?: string;
}
