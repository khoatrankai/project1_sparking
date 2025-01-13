import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
  IsDateString,
} from 'class-validator';

export class UpdateAccountCustomersDto {
  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  customer_id?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  full_name?: string;

  @IsEmail()
  @IsOptional() // Có thể cập nhật hoặc không
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  password?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  position?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional() // Có thể không có
  picture_url?: string;

  @IsEnum(['male', 'female', 'other'])
  @IsOptional() // Có thể cập nhật hoặc không
  gender?: 'male' | 'female' | 'other';

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  phone_number?: string;

  @IsDateString()
  @IsOptional() // Có thể cập nhật hoặc không
  date_of_birth?: Date;

  @IsDateString()
  @IsOptional() // Có thể cập nhật hoặc không
  date_contact?: Date;

  @IsEnum(['active', 'delete', 'hide'])
  @IsOptional() // Có thể cập nhật hoặc không
  status?: 'active' | 'delete' | 'hide';
}
