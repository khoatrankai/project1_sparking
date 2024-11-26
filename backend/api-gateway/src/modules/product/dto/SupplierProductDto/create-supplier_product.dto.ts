import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSupplierProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  supplier_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  phone_number?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  email?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
