import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateWorkDto {
  @IsString()
  work_id: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsOptional()
  position: number;

  @IsOptional()
  @IsString()
  activity?: string;

   @IsOptional()
  @IsString()
  project?: string;

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;

  @IsDate()
  time_complete: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: string[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
