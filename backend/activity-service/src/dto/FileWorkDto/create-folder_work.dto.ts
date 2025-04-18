import { IsString, IsOptional } from 'class-validator';

export class CreateFileWorkDto {
  @IsString()
  @IsOptional()
  file_id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  folder: string;

  
}
