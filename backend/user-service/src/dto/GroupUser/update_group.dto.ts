import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateGroupUserDto {
  @IsString()
  @Length(1, 50)
  group_id: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name_group?: string;
}
