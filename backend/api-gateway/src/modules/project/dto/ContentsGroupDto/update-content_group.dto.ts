
import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateContentsGroupDto {
  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  chat_group?: string;

  @IsOptional()
  @IsArray()
  user_seen?: string[];
}
