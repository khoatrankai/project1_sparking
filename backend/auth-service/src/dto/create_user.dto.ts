import {  IsEmail, IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';

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
  @Length(1, 50)
  picture_url?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  phone_number?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_facebook?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_zalo?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_in?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_skype?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  sign_name?: string;

  @IsEnum(['active', 'delete', 'hide'])
  status: string = 'active';
}