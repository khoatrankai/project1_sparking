import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  @IsOptional()
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

  @IsOptional()
  @IsString()
  activity?: string;

  @Type(()=> Date)
  @IsDate()
  time_start: Date;

  @Type(()=> Date)
  @IsDate()
  time_end: Date;
}
