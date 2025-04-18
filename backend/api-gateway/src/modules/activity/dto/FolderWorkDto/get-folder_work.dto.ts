import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetFolderWorkDto {
  @IsString()
  @IsOptional()
  folder_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  work: string;

}
