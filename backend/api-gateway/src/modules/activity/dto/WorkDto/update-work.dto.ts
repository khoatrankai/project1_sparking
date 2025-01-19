import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';

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

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  time_start?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  time_end?: Date;

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
