import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateNotifyrDto {
  @IsString()
  description: string;

  @IsString()
  link: string;

  @IsArray()
  @IsOptional()
  notify_role?: string[];

  @IsArray()
  @IsOptional()
  notify_user?: string[];
}
