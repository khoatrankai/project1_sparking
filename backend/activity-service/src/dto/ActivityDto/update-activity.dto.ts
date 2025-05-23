import { IsArray, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { CreatePictureActivityDto } from "../PictureActivityDto/get-picture_activity.dto";

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
  time_end: Date;

  @IsOptional()
  @IsDate()
  time_start: Date;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureActivityDto[];
}