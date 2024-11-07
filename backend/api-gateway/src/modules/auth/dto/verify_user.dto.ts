import {  IsString } from 'class-validator';

export class VerifyUserDto {

  @IsString()
  data: string;

  @IsString()
  otp: string;

  @IsString()
  secret: string

  
}