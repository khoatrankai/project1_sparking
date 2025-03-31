import {
  IsString,
  IsOptional,
} from 'class-validator';
export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  review_id: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
