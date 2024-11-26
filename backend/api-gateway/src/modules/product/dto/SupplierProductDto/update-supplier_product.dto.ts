import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateSupplierProductDto {

  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  phone_number?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
