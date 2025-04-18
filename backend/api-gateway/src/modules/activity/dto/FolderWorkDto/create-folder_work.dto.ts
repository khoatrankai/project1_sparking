import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderWorkDto {
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

  @IsOptional()
  files?: {url?:string,name?:string}[];
  
}
