import { IsString,IsOptional } from 'class-validator';

export class CreateRoleUserDto {

  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  project: string;

  @IsString()
  @IsOptional()
  role: string;
}
