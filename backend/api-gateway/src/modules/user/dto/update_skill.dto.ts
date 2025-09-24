import { IsString, IsOptional, Length, IsInt, Min } from 'class-validator';

export class UpdateSkillDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  skill_id: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsOptional()
  user: string; // user_id từ bảng account_users

  @IsInt()
  @IsOptional()
  @Min(0)
  score_request: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  score_review: number;
}
