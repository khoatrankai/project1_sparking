import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateChatGroupDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  head?: string;

  @IsString()
  @IsOptional()
  project: string; // ID của project

  @IsOptional()
  members: string[]; // ID của project
}
