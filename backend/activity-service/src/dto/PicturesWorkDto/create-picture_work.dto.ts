import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetPictureWorkDto {
  @IsString()
  @IsOptional()
  picture_id: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  work: string;

  @IsEnum(['start', 'end'])
  @IsOptional()
  type?: 'start' | 'end';
}
