import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {

  @IsOptional()
  @IsString()
  user_one?: string;

  @IsOptional()
  @IsString()
  user_two?: string;

  @IsString()
  @IsOptional()
  project: string;
}
