import { IsString, IsNotEmpty,IsOptional } from 'class-validator';

export class CreateRoleUserDto {

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsOptional()
  project: string;

  @IsString()
  @IsOptional()
  role: string;
}
