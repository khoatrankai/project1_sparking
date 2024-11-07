import { IsString, Length } from 'class-validator';

export class CreateRoleTypeCustomerDto {
  @IsString()
  @Length(1, 50)
  name_role: string;

  @IsString()
  @Length(1, 50)
  name_tag: string;
}