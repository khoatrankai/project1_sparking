import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Status {
  ACTIVE = 'active',
  DELETE = 'delete',
  HIDE = 'hide',
}

export class CreateAccountUserDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  picture_url?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsString()
  phone_number: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsDateString()
  date_active?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
