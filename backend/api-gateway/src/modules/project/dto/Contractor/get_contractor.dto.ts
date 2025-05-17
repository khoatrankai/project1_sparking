import { IsString, IsOptional, IsEmail, IsNumber, Length, Max, Min } from 'class-validator';

export class GetContractorDto {

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  tax_code?: string;
  
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
