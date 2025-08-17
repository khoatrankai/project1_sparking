import { IsString, IsOptional, IsInt, Min, MaxLength } from 'class-validator';

export class CreateReviewUserDto {

  @IsInt()
  @IsOptional()
  progress: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  work: string; // ID của Works

  @IsString()
  @IsOptional()
  user_work: string; // ID của ListUser

  @IsString()
  @IsOptional()
  user_create: string;
}