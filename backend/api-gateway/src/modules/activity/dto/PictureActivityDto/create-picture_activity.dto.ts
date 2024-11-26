import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetPictureActivityDto {
  @IsString()
  @IsOptional()
  picture_id: string;

  @IsString()
  @IsNotEmpty()
  url: File;

  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsEnum(['start', 'end'])
  @IsOptional()
  type?: 'start' | 'end';
}
