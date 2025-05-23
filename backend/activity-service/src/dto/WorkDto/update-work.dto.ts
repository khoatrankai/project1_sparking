import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { CreatePictureWorkDto } from '../PicturesWorkDto/get-picture_work.dto';

export class UpdateWorkDto {
  @IsString()
  @IsOptional()
  type?: string;

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

  @IsArray()
  @IsOptional()
  list_users?: string[];

  @IsOptional()
  @IsString()
  activity?: string;

  @IsDate()
  @IsOptional()
  time_start?: Date;

  @IsDate()
  @IsOptional()
  time_end?: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureWorkDto[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
