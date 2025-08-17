import { IsString, IsOptional, IsInt, Min, MaxLength } from 'class-validator';


export class UpdateReviewUserDto {
  @IsOptional()
  @IsInt()
  progress?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  user_work?: string;

  @IsOptional()
  @IsString()
  user_create?: string;
}