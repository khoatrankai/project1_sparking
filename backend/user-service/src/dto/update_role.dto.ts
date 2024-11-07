import { IsString, Length } from 'class-validator';

export class UpdateRoleTypeUserDto {
  @IsString()
  @Length(1, 50)
  role_type_id: string;

  @IsString()
  @Length(1, 50)
  name_role?: string;

  @IsString()
  @Length(1, 50)
  name_tag?: string;
}