import { IsString,  IsArray, IsInt, IsOptional, IsDate } from 'class-validator';

export class GetActivityDto {
  @IsString()
  @IsOptional()
  activity_id: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString() 
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  position: number;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsOptional()
  @IsDate()
  time_end: Date;

  @IsOptional()
  @IsDate()
  time_start: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: string[];

  @IsArray()
  @IsOptional()
  list_code_product?: string[];
}