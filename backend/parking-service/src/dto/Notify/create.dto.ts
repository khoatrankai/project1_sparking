import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateNotifyDto {

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsEnum(['public', 'delete', 'private'])
  status?: 'public' | 'delete' | 'private';

  @IsString()
  @IsOptional()
  admin: string; // ID của admin

  @IsString()
  @IsOptional()
  account: string; // ID của account user
}
