import { IsBoolean, IsString, Length } from 'class-validator';


export class CreateRoleUserDto {

  @IsString()
  @Length(1, 50)
  role_type: string;

  @IsString()
  @Length(1, 50)
  user_info: string;

  @IsBoolean()
  status: boolean = false;
}