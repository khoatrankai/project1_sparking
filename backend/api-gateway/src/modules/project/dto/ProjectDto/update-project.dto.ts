import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDate,
  Length,
} from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @Length(1, 100)
  name?: string;

  @IsEnum(['waiting', 'start', 'pause', 'cancel', 'completed'])
  @IsOptional()
  status?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional() // The type should not be empty
  type: string;

  @IsOptional()
  picture_url?: any;

  @IsInt()
  @IsOptional()
  time_job?: number;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  user_support?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  customer?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  opportunity?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  start_date?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsOptional()
  description?: string;
}
