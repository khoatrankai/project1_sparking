import { IsString, IsOptional, IsDate } from 'class-validator';

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
