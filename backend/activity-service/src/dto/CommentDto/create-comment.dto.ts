import {
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCommentDto {

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
