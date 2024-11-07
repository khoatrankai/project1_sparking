import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class AccountUsersDto {
  @IsString()
  @Length(1, 50)
  user_id: string;

  @IsString()
  @Length(1, 20)
  first_name: string;

  @IsString()
  @Length(1, 20)
  last_name: string;

  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsString()
  @Length(1, 100)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  picture_url?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  phone_number?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  link_facebook?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  link_in?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  link_skype?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  sign_name?: string;

  @IsEnum(['active', 'delete', 'hide'])
  status: string;
}
