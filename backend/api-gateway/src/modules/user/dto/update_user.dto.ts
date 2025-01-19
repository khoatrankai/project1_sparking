import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  picture_url?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  link_facebook?: string;

  @IsOptional()
  @IsString()
  link_in?: string;

  @IsOptional()
  @IsString()
  link_skype?: string;

  @IsOptional()
  @IsString()
  sign_name?: string;

  @IsOptional()
  @IsString()
  group_user?: string;

  @IsEnum(['active', 'delete', 'hide'])
  @IsOptional()
  status?: string;
}
