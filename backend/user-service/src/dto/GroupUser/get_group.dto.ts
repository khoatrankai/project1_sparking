import { IsString, Length, IsOptional } from 'class-validator';
import { GetListGroupRoleDto } from '../get_list_group_role.dto';

export class GetGroupUserDto {
  @IsString()
  @Length(1, 50)
  group_id: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name_group?: string;

  @IsOptional()
  list_role?: GetListGroupRoleDto[];
}
