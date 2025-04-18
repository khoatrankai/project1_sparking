import { Transform } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class CreateFileWorkDto {
  @IsString()
  @IsOptional()
  file_id: string;

  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return [];
    }
  })

  @IsOptional()
  files?: {url?:string,name?:string}[];

  @IsString()
  @IsOptional()
  folder: string;

  
}
