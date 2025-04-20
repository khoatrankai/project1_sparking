import { IsInt } from 'class-validator';
import { IsString, IsOptional, Length } from 'class-validator';

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
  type?: string;

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
  status?: string;

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsInt()
  @IsOptional()
  page?: number;
}
