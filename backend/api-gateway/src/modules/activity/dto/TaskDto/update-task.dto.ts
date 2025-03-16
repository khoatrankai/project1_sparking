import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { CreatePictureTaskDto } from '../PicturesTaskDto/get-picture_task.dto';
import { Type } from 'class-transformer';

export class UpdateTaskDto {

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsOptional()
  position: number;


  @IsOptional()
  @IsString()
  work?: string;

  @IsDate()
  @IsOptional()
  time_start?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  time_end?: Date;

  @Type(() => Date)
  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureTaskDto[];

  @IsArray()
  @IsOptional()
  picture_url_type?: string[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
