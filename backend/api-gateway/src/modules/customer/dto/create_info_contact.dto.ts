import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateInfoContactDto {

  @IsString()
  @Length(1, 50)
  customer: string; // ID của AccountCustomers

  @IsString()
  @Length(1, 50)
  info_company: string; // ID của CustomerInfo

  @IsBoolean()
  status: boolean;
}