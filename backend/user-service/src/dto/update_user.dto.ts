import {  IsEnum, IsOptional, IsString, Length } from "class-validator";


export class UpdateUserDto  {

    @IsString()
    @IsOptional()
    @Length(1, 50)
    password: string;
  
    @IsString()
    @Length(1, 20)
    first_name: string;
  
    @IsString()
    @Length(1, 20)
    last_name: string;
  
    @IsString()
    @IsOptional()
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
    @IsString()
    @Length(1, 50)
    link_facebook?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    link_zalo?: string;
  
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
    @IsOptional()
    status: string;
}