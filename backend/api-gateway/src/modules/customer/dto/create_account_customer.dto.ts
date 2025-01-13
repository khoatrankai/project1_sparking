import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
  IsDateString,
} from 'class-validator';

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
  @IsOptional()
  position?: string;

  @IsOptional()
  @IsString()
  customer_info?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional() // Có thể không có
  picture_url?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender: 'male' | 'female' | 'other';

  @IsString()
  @IsOptional()
  @Length(1, 50)
  phone_number?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: Date;

  @IsOptional()
  @IsEnum(['active', 'delete', 'hide'])
  status: 'active' | 'delete' | 'hide';
}
