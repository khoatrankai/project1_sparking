import { IsString, IsOptional, IsNumber, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateParkingApartmentDto {
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  owner_name?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  owner_phone?: string;

  @IsOptional()
  @IsEmail()
  owner_email?: string;

  @IsOptional()
  @IsNumber()
  bike_slot?: number;

  @IsOptional()
  @IsNumber()
  car_slot?: number;
}
