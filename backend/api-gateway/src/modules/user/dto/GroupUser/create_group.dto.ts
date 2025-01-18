import { IsString, Length } from 'class-validator';

export class CreateGroupUserDto {
  @IsString()
  @Length(1, 50)
  name_group: string;
}
