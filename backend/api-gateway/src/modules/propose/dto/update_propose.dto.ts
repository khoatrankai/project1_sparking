import { IsString, IsEnum, IsOptional, IsDateString, IsPhoneNumber, IsInt } from 'class-validator';

export class UpdateProposeDto {
  @IsString()
  propose_id: string;

  @IsString()
  @IsOptional()
  name_propose?: string;

  @IsEnum(['OP', 'CT'])
  @IsOptional()
  type_related?: string;

  @IsString()
  @IsOptional()
  related_id?: string;

  @IsInt()
  price?:number

  @IsDateString()
  @IsOptional()
  date_start?: Date;

  @IsDateString()
  @IsOptional()
  date_end?: Date;

  @IsEnum(['vnd', 'usd'])
  @IsOptional()
  type_money?: string;

  @IsEnum(['none', 'before', 'after'])
  @IsOptional()
  type_discount?: string;

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  staff_support?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsPhoneNumber(null)
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  send_to?: string;

  @IsString()
  @IsOptional()
  province?: string;
}