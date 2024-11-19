import { IsString, IsOptional, IsDate } from 'class-validator';

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

  @IsOptional()
  @IsString()
  activity?: string;

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;
}
