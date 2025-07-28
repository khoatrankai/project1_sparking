
import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateContentsDto {
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
  chat?: string;

  @IsOptional()
  @IsArray()
  user_seen?: string[];
}
