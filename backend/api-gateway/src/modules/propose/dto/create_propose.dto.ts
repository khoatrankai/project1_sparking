import { IsString, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateProposeDto {
  @IsString()
  name_propose: string;

  @IsEnum(['OP', 'CT'])
  type_related: string;

  @IsString()
  @IsOptional()
  related_id?: string;

  @IsDateString()
  date_start: Date;

  @IsDateString()
  date_end: Date;

  @IsInt()
  price:number

  @IsEnum(['vnd', 'usd'])
  type_money: string;

  @IsEnum(['none', 'before', 'after'])
  type_discount: string;

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  status: string;

  @IsString()
  @IsOptional()
  staff_support?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  send_to?: string;

  @IsString()
  @IsOptional()
  province?: string;
}