import { IsString, IsNotEmpty,IsOptional } from 'class-validator';

export class UpdateRoleUserDto {

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
