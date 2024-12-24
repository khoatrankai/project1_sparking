import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreatePictureActivityDto {
  @IsString()
  @IsOptional()
  picture_id: string;

  @IsString()
  @IsOptional()
  url: File;

  @IsString()
  @IsOptional()
  activity: string;

  @IsEnum(['start', 'end'])
  @IsOptional()
  type?: 'start' | 'end';
}
