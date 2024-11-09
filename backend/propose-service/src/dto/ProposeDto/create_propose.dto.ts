import { IsString, IsDate, IsEnum, IsOptional, IsInt, IsEmail, Length, IsPhoneNumber } from 'class-validator';

export class CreateProposeDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  propose_id?: string;

  @IsString()
  @Length(1, 50)
  name_propose: string;

  @IsDate()
  date_start: Date;

  @IsDate()
  date_end: Date;

  @IsEnum(['vnd', 'usd'])
  type_money: 'vnd' | 'usd';

  @IsInt()
  price: number;

  @IsString()
  @Length(1, 50)
  contract: string;

  @IsEnum(['none', 'before', 'after'])
  type_discount: 'none' | 'before' | 'after';

  @IsEnum(['draff', 'send', 'open', 'edit', 'refuse', 'accept'])
  status: 'draff' | 'send' | 'open' | 'edit' | 'refuse' | 'accept';

  @IsOptional()
  @IsString()
  @Length(1, 50)
  staff_support?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
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
