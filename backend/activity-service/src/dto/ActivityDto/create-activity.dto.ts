// activities.dto.ts
import { IsString, IsOptional,  IsNotEmpty, IsArray, IsInt } from 'class-validator';
import { CreatePictureActivityDto } from '../PictureActivityDto/get-picture_activity.dto';

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

  @IsInt()
  @IsOptional()
  position: number;

  @IsString() 
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsArray()
  @IsOptional()
  picture_urls?: CreatePictureActivityDto[];

}




