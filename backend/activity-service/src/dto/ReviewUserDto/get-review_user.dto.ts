import { IsString, IsOptional, IsInt, Min, MaxLength } from 'class-validator';

export class GetReviewUserDto {
  @IsString()
  @MaxLength(50)
  review_id: string;

  @IsInt()
  @Min(0)
  progress: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @MaxLength(50)
  work: string; // ID của Works

  @IsString()
  @MaxLength(50)
  user_work: string; // ID của ListUser

  @IsString()
  @MaxLength(50)
  user_create: string;
}
