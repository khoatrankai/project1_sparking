import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { CreatePictureTaskDto } from '../PicturesTaskDto/get-picture_task.dto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  task_id?: string;

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

  @IsDate()
  @IsOptional()
  time_end?: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureTaskDto[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
