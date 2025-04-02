import {
  IsString,
  IsOptional,
} from 'class-validator';
export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  comment_id: string;

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
