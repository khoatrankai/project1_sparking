import {  IsNotEmpty, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;

  
}