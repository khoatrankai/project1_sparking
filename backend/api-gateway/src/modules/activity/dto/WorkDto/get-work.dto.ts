import { IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';

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

   @IsOptional()
  @IsString()
  project?: string;

  @IsDate()
  time_start: Date;

  @IsDate()
  time_end: Date;

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
