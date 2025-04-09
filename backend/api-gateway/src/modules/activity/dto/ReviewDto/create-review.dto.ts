import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateReviewDto {

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  progress: number;

  @Type(()=> Date)
  @IsOptional()
  @IsDate()
  time_end: Date;

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
