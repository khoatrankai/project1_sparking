import { IsString, IsOptional } from 'class-validator';

export class GetFilterActivityDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  contract?: string;

  @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsOptional()
  date_end: string;

  @IsString()
  @IsOptional()
  date_start: string;
}
