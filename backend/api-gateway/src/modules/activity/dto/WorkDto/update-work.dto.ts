import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';

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

  @IsArray()
  @IsOptional()
  list_users?: string[];

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
