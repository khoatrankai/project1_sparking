import { IsString, IsBoolean, Length } from 'class-validator';

export class CreateRoleCustomerDto {

  @IsString()
  @Length(1, 50)
  role_type: string; 

  @IsString()
  @Length(1, 50)
  customer: string; 

  @IsString()
  @Length(1, 50)
  info_company: string; 

  @IsBoolean()
  status: boolean = false;
}