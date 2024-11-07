import { IsString, IsEnum, IsInt, IsOptional, IsDateString, Length } from 'class-validator';

export class CreateContractDto {

  @IsString()
  @Length(1, 50)
  name_contract: string;

  @IsString()
  @Length(1, 50)
  customer: string;

  @IsInt()
  price: number;

  @IsString()
  @Length(1, 50)
  type_contract: string; // ID của TypeContract

  @IsDateString()
  date_start: Date;

  @IsDateString()
  date_expired: Date;

  @IsEnum(['delete', 'active', 'hide'])
  status: 'delete' | 'active' | 'hide';

  @IsString()
  @IsOptional()
  description?: string;
}