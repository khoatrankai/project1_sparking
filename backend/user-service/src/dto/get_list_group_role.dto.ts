import { IsString, IsOptional } from 'class-validator';
import { GetGroupUserDto } from './GroupUser/get_group.dto';
import { UpdateRoleTypeUserDto } from './update_role.dto';

export class GetListGroupRoleDto {
  @IsString()
  list_id: string;

  @IsOptional()
  group_role?: GetGroupUserDto;

  @IsOptional()
  role_type?: UpdateRoleTypeUserDto;
}
