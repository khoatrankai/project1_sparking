import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePictureActivityDto {
  @IsString()
  @IsOptional()
  picture_id: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  activity: string;

  @IsEnum(['start', 'end'])
  @IsOptional()
  type?: 'start' | 'end';
}
