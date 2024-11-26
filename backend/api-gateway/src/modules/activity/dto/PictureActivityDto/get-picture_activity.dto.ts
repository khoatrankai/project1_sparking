import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePictureActivityDto {
  @IsString()
  @IsOptional()
  picture_id: string;

  @IsNotEmpty()
  url: File;

  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsEnum(['start', 'end'])
  @IsOptional()
  type?: 'start' | 'end';
}
