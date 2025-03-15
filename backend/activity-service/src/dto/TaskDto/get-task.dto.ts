import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class GetTaskDto {
  @IsString()
  task_id: string;


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
  work?: string;

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;

  @IsArray()
  @IsOptional()
  picture_urls?: string[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
