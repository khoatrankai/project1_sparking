import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  review_id: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  level: number;

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
