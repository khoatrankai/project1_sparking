import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateListUserDto {
  @IsString()
  @IsOptional()
  list_id: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  work: string;
}