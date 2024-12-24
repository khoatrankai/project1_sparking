import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsArray } from 'class-validator';
import { CreatePictureActivityDto } from '../PictureActivityDto/create-picture_activity.dto';

export class CreateWorkDto {
  @IsString()
  @IsOptional()
  work_id: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  activity?: string;

  @Type(()=> Date)
  @IsDate()
  time_start: Date;

  @Type(()=> Date)
  @IsDate()
  time_end: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureActivityDto[];

  @IsArray()
  @IsOptional()
  picture_url_type?: string[];

  @IsArray()
  @IsOptional()
  list_users?: string[];
}
