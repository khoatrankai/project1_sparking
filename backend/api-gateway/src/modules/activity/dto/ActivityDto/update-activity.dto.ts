import { IsArray, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { CreatePictureActivityDto } from "../PictureActivityDto/create-picture_activity.dto";
import { Type } from "class-transformer";

export class UpdateActivityDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  position: number;

  @IsOptional()
  @IsDate()
  @Type(()=> Date)
  time_end: Date;

  @IsOptional()
  @Type(()=> Date)
  @IsDate()
  time_start: Date;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureActivityDto[];

  @IsArray()
  @IsOptional()
  picture_url_type?: string[];
}