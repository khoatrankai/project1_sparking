import { IsString, IsOptional, IsDate, IsInt } from 'class-validator';

export class UpdateWorkDto {

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  name?: string;

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
  @IsOptional()
  time_start?: Date;

  @IsDate()
  @IsOptional()
  time_end?: Date;
}
