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

  @IsInt()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  time_job?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  picture_url?: string;

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

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsOptional()
  description?: string;
}
