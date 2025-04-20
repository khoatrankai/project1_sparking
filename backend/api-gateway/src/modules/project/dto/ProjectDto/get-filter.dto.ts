import { Type } from 'class-transformer';
import { IsString, IsOptional, Length, IsInt } from 'class-validator';

export class GetFilterProjectDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  customer?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  opportunity?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  user?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  type_project?: string;


  @IsString()
  @IsOptional()
  @Length(1, 50)
  type?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number;
}
