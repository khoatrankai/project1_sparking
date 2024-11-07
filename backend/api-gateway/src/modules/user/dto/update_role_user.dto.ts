import { IsBoolean, IsString, Length} from 'class-validator';

export class UpdateRoleUserDto {

  @IsString()
  @Length(1, 50)
  role_id: string;

  @IsBoolean()
  status: boolean;
}