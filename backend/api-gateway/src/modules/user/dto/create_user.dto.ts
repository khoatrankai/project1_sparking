import { IsEnum, IsOptional, IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  password: string;

  @IsString()
  @Length(1, 20)
  first_name: string;

  @IsString()
  @Length(1, 20)
  last_name: string;

  @IsEmail()
  @Length(1, 50)
  email: string;

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
  link_zalo?: string;

  @IsOptional()
  @IsString()
  link_in?: string;

  @IsOptional()
  @IsString()
  link_skype?: string;

  @IsOptional()
  @IsString()
  sign_name?: string;

  @IsEnum(['active', 'delete', 'hide'])
  status: string = 'active';

  @IsOptional()
  @IsString()
  group_user?: string;
}
