import {
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { CreatePictureTaskDto } from '../PicturesTaskDto/get-picture_task.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {

  @IsString()
  status: string;

  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  position: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  time_start: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  time_end: Date;

  @IsArray()
  @IsOptional()
  picture_urls: CreatePictureTaskDto[];

  @IsArray()
  @IsOptional()
  picture_url_type?: string[];

  @IsArray()
  @IsOptional()
  list_users?: string[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
