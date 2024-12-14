import { IsString, IsInt, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContractDto {
  @IsString()
  @IsOptional()
  contract_id?: string;

  @IsString()
  @IsOptional()
  name_contract?: string;

  @IsString()
  @IsOptional()
  code_contract?: string;

  @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsOptional()
  customer?: string;

  @IsString()
  @IsOptional()
  vat?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsEnum(['default', 'time'])
  @IsOptional()
  type?: string;

  @IsInt()
  @IsOptional()
  times?: number;

  @IsString()
  @IsOptional()
  type_contract?: string; // hoặc là ID của `TypeContract`

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_start?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date_expired?: Date;

  @IsEnum(['delete', 'active', 'hide','completed'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;

}
