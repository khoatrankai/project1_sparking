import { IsString, IsEmail, IsEnum, IsOptional, Length, IsDateString } from 'class-validator';

export class CreateAccountCustomersDto {

  @IsString()
  @Length(1, 50)
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 100)
  password: string;

  @IsString()
  @Length(1, 50)
  position?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional() // Có thể không có
  picture_url?: string;

  @IsEnum(['male', 'female', 'other'])
  gender: 'male' | 'female' | 'other';

  @IsString()
  @Length(1, 50)
  phone_number?: string;
  

  @IsDateString()
  date_of_birth?: Date;

  @IsDateString()
  date_contact: Date;

  @IsEnum(['active', 'delete', 'hide'])
  status: 'active' | 'delete' | 'hide';
}