import {
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { CreatePictureWorkDto } from '../PicturesWorkDto/get-picture_work.dto';

export class CreateWorkDto {
  @IsString()
  work_id: string;

  @IsString()
  type: string;

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
  activity?: string;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  user_create?: string;

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;

  @IsDate()
  time_complete: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureWorkDto[];

  @IsArray()
  @IsOptional()
  list_users?: string[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
