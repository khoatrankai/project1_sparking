import { IsString, IsOptional, IsDate, IsArray } from 'class-validator';
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

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  activity?: string;

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureWorkDto[];

  @IsArray()
  @IsOptional()
  list_users?: string[];

}
