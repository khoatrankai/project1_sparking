import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePictureTaskDto {
  @IsString()
  @IsOptional()
  picture_id: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  task: string;

  @IsEnum(['start', 'end'])
  @IsOptional()
  type?: 'start' | 'end';
}
