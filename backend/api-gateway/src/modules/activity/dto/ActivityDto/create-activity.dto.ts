// activities.dto.ts
import { IsString, IsOptional,  IsNotEmpty, IsArray, IsInt } from 'class-validator';
import { CreatePictureActivityDto } from '../PictureActivityDto/create-picture_activity.dto';

export class CreateActivityDto {
  @IsString()
  @IsOptional()
  activity_id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString() 
  @IsNotEmpty()
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

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureActivityDto[];

  @IsArray()
  @IsOptional()
  picture_url_type?: string[];

}




