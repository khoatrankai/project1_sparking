import { IsString, IsOptional, IsDate, IsInt } from 'class-validator';

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

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;
}
