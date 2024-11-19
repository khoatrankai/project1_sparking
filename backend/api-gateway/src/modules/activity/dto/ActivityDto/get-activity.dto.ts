import { IsString,  IsArray } from 'class-validator';

export class GetActivityDto {
  @IsString()
  activity_id: string;

  @IsString()
  type: string;

  @IsString()
  name: string;

  @IsString() 
  status: string;

  @IsString()
  description?: string;

  @IsString()
  contract?: string;

  @IsArray()
  picture_urls?: string[];

  @IsArray()
  list_code_product?: string[];
}