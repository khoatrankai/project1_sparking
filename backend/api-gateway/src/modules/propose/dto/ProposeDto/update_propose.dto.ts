import { IsString, IsDate, IsEnum, IsOptional, IsInt, IsEmail, Length } from 'class-validator';

export class UpdateProposeDto {

  @IsString()
  @IsOptional()
  @Length(1, 50)
  name_propose: string;

  @IsDate()
  @IsOptional()
  date_start: Date;

  @IsDate()
  @IsOptional()
  date_end: Date;

  @IsEnum(['vnd', 'usd'])
  @IsOptional()
  type_money: 'vnd' | 'usd';

  @IsInt()
  @IsOptional()
  price: number;

  @IsString()
  @Length(1, 50)
  contract: string;

  @IsEnum(['none', 'before', 'after'])
  @IsOptional()
  type_discount: 'none' | 'before' | 'after';

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  @IsOptional()
  status: 'draff' | 'send' | 'open' | 'edit' | 'refuse' | 'accept';

  @IsOptional()
  @IsString()
  @Length(1, 50)
  staff_support?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  send_to?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  province?: string;
}
