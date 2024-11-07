import { IsString, IsEnum, IsInt, IsOptional, IsDateString, Length } from 'class-validator';

export class UpdateContractDto {
  @IsString()
  @Length(1, 50)
  contract_id: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name_contract?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  customer?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  type_contract?: string; // ID của TypeContract

  @IsDateString()
  @IsOptional()
  date_start?: Date;

  @IsDateString()
  @IsOptional()
  date_expired?: Date;

  @IsEnum(['delete', 'active', 'hide'])
  @IsOptional()
  status?: 'delete' | 'active' | 'hide';

  @IsString()
  @IsOptional()
  description?: string;
}